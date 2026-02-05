using System;
using System.Collections.Generic;
using System.Text;
using UserManagement.Data.DTOs;
using UserManagement.Data.Entites;

namespace UserManagement.Data.Mapper
{
    public static class UserMapper
    {
        public static UserDto ToDto(User user)
        {
            return new UserDto
            {
                Id = user.Id,
                Username = user.UserName,
                UserFullName = user.UserFullName,
                IsActive = user.IsActive,
                DateOfBirth = user.DateOfBirth,
                CreationDate = user.CreationDate
            };
        }

        public static User ToEntity(CreateUserDto dto)
        {
            return new User
            {
                UserName = dto.Username,
                UserFullName = dto.UserFullName,
                IsActive = dto.IsActive,
                DateOfBirth = dto.DateOfBirth,
                CreationDate = DateTime.UtcNow
            };
        }

        public static void UpdateEntity(User user, UpdateUserDto dto)
        {
            user.UserName = dto.Username;
            user.UserFullName = dto.UserFullName;
            user.IsActive = dto.IsActive;
            user.DateOfBirth = dto.DateOfBirth;
        }
    }
}
