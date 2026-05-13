using Microsoft.AspNetCore.Mvc;
using Stock_DataAccess.Models;
using Stock_DataAccess.ViewModel;

namespace Stock_Client.Controllers
{
    public class StudentController : Controller
    {
        public IActionResult Index()
        {
            StudentViewModel obj = new StudentViewModel();
            List<Student> students = Student.getStudent();
            IEnumerable<Student> students1 = students.Where(x => x.ID < 5);
            obj.students = (List<Student>)students1.Cast<Student>().ToList();
            return View(obj);
        }
        public IActionResult Searchable()
        {
            return View();
        }
        //public JsonResult getStudent(int lastStudent)
        //{
        //    List<Student> student = Student.getStudent().Where(x => x.ID == lastStudent).Cast<Student>().ToList();
        //    return Json(student);
        //} 
    }
}
