namespace Stock_Client.Models
{
    public class AuthMiddleware
    {
        private readonly RequestDelegate _next;
        private const string SecretKey = "12345"; // আপনার Secret Key

        public AuthMiddleware(RequestDelegate next)
        {
            _next = next;
        } 
        public async Task InvokeAsync(HttpContext context)
        {
            if (!context.Request.Headers.TryGetValue("X-Auth-Key", out var key) || key != SecretKey)
            {
                context.Response.StatusCode = 401; // Unauthorized
                await context.Response.WriteAsync("Authentication Failed: Invalid or missing X-Auth-Key");
                return; // pipeline থামিয়ে দেয়া হলো
            }

            await _next(context); 
        }
    }

}
