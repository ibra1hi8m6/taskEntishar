using Microsoft.AspNetCore.Identity;
namespace UserManagement.Data.Entites
{
    public class User : IdentityUser
    {
        public string UserFullName { get; set; }
        public bool IsActive { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
