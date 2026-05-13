using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stock_API.Utility;
using Stock_DataAccess.Models;
using Stock_DataAccess.Repositories;

namespace Stock_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly ITokenService _tokenManager;
        private IUnitofWork _unitofWork;
        ModelsMessage _modelsMessage;
        public TokenController(TokenManager tokenManager, UnitofWork unitOfWork, ModelsMessage modelsMessage)
        {
            _tokenManager = tokenManager ?? throw new ArgumentNullException(nameof(tokenManager));
            _unitofWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
            _modelsMessage = new ModelsMessage();//must create DI

        }
        [HttpPost]
        [Route("RefreshToken")]
        public IActionResult RefreshToken(TokenApiModel tokenApiModel, string host)
        {
            if (tokenApiModel is null)
            {
                return BadRequest("Invalid Client request");
            }
            string accessToken = tokenApiModel.AccessToken;
            string refreshToken = tokenApiModel.RefreshToken;
            var principal = _tokenManager.GetPrincipalFromExpiredToken(accessToken);
            var username = principal.Identity.Name; //this is mapped to the Name claim by default


            var loggeduser = _unitofWork.LoginModelRepository.GetAll(l => l.UserName == username , null).FirstOrDefault();

            if (loggeduser is null || loggeduser.RefreshToken != refreshToken || loggeduser.RefreshTokenExpiryTime <= DateTime.Now)
                return BadRequest("Invalid client request");

            var newAccessToken = _tokenManager.GenerateAccessToken(principal.Claims);
            var newRefreshToken = _tokenManager.GenerateRefreshToken();
            loggeduser.RefreshToken = newRefreshToken;

            _unitofWork.LoginModelRepository.Update(loggeduser);
            var m = this._unitofWork.Save();

            if (m.IsSuccess)
            {
                return Ok(new
                {
                    Data = new AuthenticatedResponse
                    {
                        RefreshToken = newRefreshToken,
                        Token = newAccessToken
                    },
                    result = m
                });
            }
            else
            {
                return Problem(m.Message);

            }

        }

        [HttpPost, Authorize]
        [Route("revoke")]
        public IActionResult Revoke()
        {
            var username = User.Identity.Name;
            //var user = _userContext.LoginModels.SingleOrDefault(u => u.UserName == username);
            var loggeduser = _unitofWork.LoginModelRepository.GetAll(l => l.UserName == username, null).SingleOrDefault();
            if (loggeduser == null) return BadRequest();
            loggeduser.RefreshToken = null;
            _unitofWork.LoginModelRepository.Update(loggeduser);
            var m = this._unitofWork.Save();

            if (m.IsSuccess)
            {
                return NoContent();
            }
            else
            {
                return Problem(m.Message);

            }

        }
    }
}
