# User Management Application

A full-stack user management application built with .NET Core 10 (Backend) and Angular 21 (Frontend).

## Features

- **Authentication**: Login with JWT token-based authentication
- **User Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Authorization**: Protected routes using JWT
- **Validation**: Client-side and server-side form validation
- **Plain Text Passwords**: As requested, passwords are stored without hashing

## Technology Stack

### Backend
- .NET Core 10
- ASP.NET Core Identity
- Entity Framework Core
- SQLite Database
- JWT Authentication

### Frontend
- Angular 21
- Standalone Components
- Reactive Forms
- RxJS
- Local Storage for JWT token

## Project Structure

### Backend (3-Layer Architecture)

```
Backend/
├── Controllers/
│   ├── AuthController.cs          # Authentication endpoints (login, register)
│   └── UsersController.cs         # User CRUD endpoints
│
├── Data/
│   ├── Entities/
│   │   └── User.cs                # User entity
│   └── ApplicationDbContext.cs    # Entity Framework Core DbContext
│
├── DTOs/
│   ├── CreateUserDto.cs           # Create user request DTO
│   ├── LoginDto.cs                # Login request DTO
│   ├── LoginResponseDto.cs        # Login response DTO
│   ├── UpdateUserDto.cs           # Update user request DTO
│   └── UserDto.cs                 # User response DTO
│
├── Services/
│   ├── Interfaces/
│   │   ├── IAuthService.cs        # Authentication service interface
│   │   └── IUserService.cs        # User service interface
│   │
│   ├── Implementations/
│   │   ├── AuthService.cs         # Authentication service logic
│   │   └── UserService.cs         # User management logic
│   │
│   └── Mappers/
│       └── UserMapper.cs          # Entity ↔ DTO mapping
│
├── Extensions/
│   ├── ServiceExtensions.cs       # Dependency Injection extensions
│   └── PlainTextPasswordHasher.cs # Custom password hasher
│
├── Migrations/                    # EF Core migrations
│
├── Program.cs                     # Application entry point
├── appsettings.json               # Application configuration
```

### Frontend (Standalone Components)

```
Frontend/
└── src/
    └── app/
        ├── components/
        │   ├── home/                         # Home page
        │   ├── login/                        # Login page
        │   └── user-management/              # User management module
        │       ├── add-user/                 # Add user component
        │       ├── update-user/              # Update user component
        │       ├── delete-user/              # Delete user component
        │       └── user-list/                # List users component
        │
        ├── core/
        │   ├── guards/
        │   │   └── auth-guard.ts             # Route protection
        │   ├── models/
        │   │   └── user.ts                   # User model
        │   └── services/
        │       ├── auth-service/
        │       │   └── auth-service.ts       # Authentication service
        │       └── user-service/
        │           └── user-service.ts       # User CRUD service
        │
        ├── app.component.ts                  # Root component
        ├── app.routes.ts                    # Application routes
        ├── app.config.ts                    # App configuration
        ├── app.config.server.ts             # Server-side config
        ├── app.css                          # Global styles
        └── app.html                         # Root template
```

## Setup Instructions

### Prerequisites
- .NET 10 SDK
- Node.js (v24 or higher)
- npm 

### Backend Setup

1. Navigate to the Backend directory:
```bash
cd UserManagement
```

2. Restore NuGet packages:
```bash
dotnet restore
```

3. Apply database migrations:
```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

4. Run the backend:
```bash
dotnet run
```

The API will start at `http://localhost:7278`

### Frontend Setup

1. Navigate to the Frontend directory:
```bash
cd UserManagementApp/Frontend
```

2. Install npm packages:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will start at `http://localhost:4200`

## Usage

### 1. Create a User

Since no users exist initially, you can create a user using Swagger or API directly:

**Using Swagger:**
- Navigate to `http://localhost:7278/swagger`
- Use the POST `/api/Users/createuser` endpoint
- Provide user details

**Using curl:**
```bash
curl -X POST http://localhost:7278/api/Users/createuser \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123",
    "userFullName": "Admin User",
    "isActive": true,
    "dateOfBirth": "1990-01-01"
  }'
```

### 2. Login

1. Open `http://localhost:4200` in your browser
2. Enter your username and password
3. Click "Login"
4. You'll be redirected to the Home page

### 3. Manage Users

From the Home page:
- Click "Manage Users" to access user management
- **Add User**: Fill the form and click "Add User"
- **Edit User**: Click "Edit" on any user row, modify details, click "Update"
- **Delete User**: Click "Delete" on any user row, confirm deletion
- **View Users**: All users are displayed in a table

## API Endpoints

### Authentication
- **POST** `/api/Auth/login` - User login

### Users (Requires Authentication)
- **GET** `/api/users/getuser` - Get all users
- **GET** `/api/users/getuserbyid/{id}` - Get user by ID
- **POST** `/api/users/createuser` - Create new user
- **PUT** `/api/users/updateuserbyid/{id}` - Update user
- **DELETE** `/api/users/deleteuserbyid{id}` - Delete user

## Security Notes

⚠️ **Important**: This application stores passwords in plain text as per requirements. This is **NOT** recommended for production use. In a real-world scenario, always use proper password hashing (bcrypt, PBKDF2, Argon2).

## Key Features Implementation

### Backend

1. **Extension Classes**: All service registrations are in `ServiceExtensions.cs` to keep `Program.cs` clean
2. **Three Layers**: 
   - Data layer (Entities, DbContext, DTOs, Mappers)
   - Services layer (Interfaces, Implementations)
   - Controllers layer
3. **DTOs and Mappers**: Separate DTOs for different operations with static mapper class
4. **JWT Authentication**: Using ASP.NET Core Identity with custom JWT generation
5. **Plain Text Passwords**: Custom `PlainTextPasswordHasher` implementation

### Frontend

1. **Standalone Components**: All components are standalone (no NgModule)
2. **Component Structure**: 
   - Parent: `UserManagementComponent`
   - Children: `AddUserComponent`, `UpdateUserComponent`, `DeleteUserComponent`, `UserListComponent`
3. **JWT Storage**: Token stored in localStorage
4. **Form Validation**: Both template-driven validation and required fields
5. **Route Guards**: `authGuard` protects authenticated routes

## Validation Rules

### Login Form
- Username: Required
- Password: Required

### User Create/Edit Form
- Username: Required
- Password: Required (for create), Optional (for update)
- Full Name: Required
- Date of Birth: Required
- Is Active: Boolean checkbox

## Database Schema

**User Table** (extends IdentityUser):
- Id (string, PK)
- Username (string)
- Password (string, plain text)
- UserFullName (string)
- IsActive (boolean)
- DateOfBirth (DateTime)
- CreationDate (DateTime)


## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure:
- Backend is running on `http://localhost:7278`
- Frontend is running on `http://localhost:4200`
- CORS policy in `ServiceExtensions.cs` matches the frontend URL

### Database Issues
If database is not created:
```bash
cd Backend
dotnet ef database update
```

### JWT Token Issues
If authentication fails:
- Check that the JWT secret key in `appsettings.json` is at least 32 characters
- Verify token is being saved to localStorage
- Check browser console for errors

