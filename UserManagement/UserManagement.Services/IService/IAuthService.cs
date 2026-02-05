using System;
using System.Collections.Generic;
using System.Text;
using UserManagement.Data.DTOs;

namespace UserManagement.Services.IService
{
    public interface IAuthService
    {
        Task<LoginResponseDto> LoginAsync(LoginDto loginDto);
        string GenerateJwtToken(string userId, string username);
    }
}
