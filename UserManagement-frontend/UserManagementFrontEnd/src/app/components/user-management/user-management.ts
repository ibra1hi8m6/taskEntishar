import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AddUserComponent } from './add-user/add-user';
import { UpdateUserComponent } from './update-user/update-user';
import { DeleteUserComponent } from './delete-user/delete-user';
import { UserListComponent } from './user-list/user-list';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth-services/auth-service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    AddUserComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    UserListComponent
  ],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css',
})
export class UserManagementComponent {
  selectedUser: User | null = null;
  userIdToDelete: string = '';

  @ViewChild(UserListComponent) userListComponent!: UserListComponent;
  @ViewChild(DeleteUserComponent) deleteUserComponent!: DeleteUserComponent;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onEditUser(user: User): void {
    this.selectedUser = user;
  }

  onCancelUpdate(): void {
    this.selectedUser = null;
  }

  onUserAdded(): void {
    this.userListComponent.refreshList();
  }

  onUserUpdated(): void {
    this.selectedUser = null;
    this.userListComponent.refreshList();
  }

  onDeleteUser(userId: string): void {
    this.userIdToDelete = userId;
    this.deleteUserComponent.deleteUser(userId);
  }

  onUserDeleted(): void {
    this.userIdToDelete = '';
    this.userListComponent.refreshList();
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
