using System;
using System.Collections.Generic;
using System.Text;
using UserManagement.Data.DTOs;
using UserManagement.Data.Entites;

namespace UserManagement.Services.IService
{
    public interface IAuthService
    {
        Task<LoginResponseDto> LoginAsync(LoginDto loginDto);
        string GenerateJwtToken(User user);
    }
}
