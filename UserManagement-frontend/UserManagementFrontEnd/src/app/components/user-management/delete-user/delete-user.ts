import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user-services/user-service';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-user.html',
  styleUrl: './delete-user.css',
})
export class DeleteUserComponent {
  @Input() userId: string = '';
  @Output() userDeleted = new EventEmitter<void>();

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.successMessage = 'User deleted successfully!';
        this.errorMessage = '';
        this.userDeleted.emit();
      },
      error: (error) => {
        this.errorMessage = 'Failed to delete user';
        this.successMessage = '';
      }
    });
  }
}
