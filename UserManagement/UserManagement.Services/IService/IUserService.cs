using System;
using System.Collections.Generic;
using System.Text;
using UserManagement.Data.DTOs;

namespace UserManagement.Services.IService
{
    public interface IUserService
    {
        Task<List<UserDto>> GetAllUsersAsync();
        Task<UserDto> GetUserByIdAsync(string id);
        Task<UserDto> CreateUserAsync(CreateUserDto createUserDto);
        Task<UserDto> UpdateUserAsync(UpdateUserDto updateUserDto);
        Task<bool> DeleteUserAsync(string id);
    }
}
