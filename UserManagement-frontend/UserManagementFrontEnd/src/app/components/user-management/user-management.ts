import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

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
    RouterModule,
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
  userToDelete: User | null = null;

  @ViewChild(UserListComponent)
  userListComponent!: UserListComponent;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  // Navigation to child components
  navigateTo(path: string): void {
    this.router.navigate([`/users/${path}`]);
  }

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

  onDeleteUser(user: User): void {
    this.userToDelete = user;
  }

  onUserDeleted(): void {
    this.userToDelete = null;
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
