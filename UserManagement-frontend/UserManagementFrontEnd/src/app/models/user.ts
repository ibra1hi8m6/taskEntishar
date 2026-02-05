export interface User {
  id: string;
  username: string;
  userFullName: string;
  isActive: boolean;
  dateOfBirth: Date;
  creationDate: Date;
}

export interface CreateUserDto {
  username: string;
  password: string;
  userFullName: string;
  isActive: boolean;
  dateOfBirth: Date;
}

export interface UpdateUserDto {
  id: string;
  username: string;
  password: string;
  userFullName: string;
  isActive: boolean;
  dateOfBirth: Date;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  
}
