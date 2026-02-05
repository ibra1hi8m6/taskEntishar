import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user-services/user-service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-user.html',
  styleUrl: './delete-user.css',
})
export class DeleteUserComponent {
  @Input() user!: User;               
  @Output() userDeleted = new EventEmitter<void>();

  confirming = false;
  successMessage = '';
  errorMessage = '';

  constructor(private userService: UserService) {}

  confirmDelete(): void {
    this.confirming = true;
  }

  deleteConfirmed(): void {
    if (!this.user) return;
    this.userService.deleteUser(this.user.id).subscribe({
      next: () => {
        this.userDeleted.emit();
        this.confirming = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to delete user';
        this.confirming = false;
      }
    });
  }
}
