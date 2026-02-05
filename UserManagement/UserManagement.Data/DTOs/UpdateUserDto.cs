using System;
using System.Collections.Generic;
using System.Text;

namespace UserManagement.Data.DTOs
{
    public class UpdateUserDto
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string UserFullName { get; set; }
        public bool IsActive { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}
