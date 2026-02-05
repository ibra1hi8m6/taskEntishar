import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user-services/user-service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  errorMessage: string = '';

  @Output() editUser = new EventEmitter<User>();
  @Output() deleteUser = new EventEmitter<User>();
  @Output() usersLoaded = new EventEmitter<void>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.usersLoaded.emit();
      },
      error: (error) => {
        this.errorMessage = 'Failed to load users';
      }
    });
  }

  onEdit(user: User): void {
    this.editUser.emit(user);
  }

 onDelete(user: User): void {
  if (confirm('Are you sure you want to delete this user?')) {
    this.deleteUser.emit(user); 
  }
}

  refreshList(): void {
    this.loadUsers();
  }
}
