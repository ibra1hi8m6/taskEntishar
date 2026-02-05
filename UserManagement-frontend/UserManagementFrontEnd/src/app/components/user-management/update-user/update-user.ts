import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { UserService } from '../../../services/user-services/user-service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-user.html',
  styleUrl: './update-user.css',
})
export class UpdateUserComponent implements OnChanges {
  @Input() selectedUser: User | null = null;
  @Output() userUpdated = new EventEmitter<void>();
  @Output() cancelUpdate = new EventEmitter<void>();

  form: FormGroup;
  isSubmitted = false;

  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.form = this.fb.group({
      id: [''],
      username: ['', Validators.required],
      password: [''], // optional
      userFullName: ['', Validators.required],
      isActive: [true],
      dateOfBirth: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedUser'] && this.selectedUser) {
      this.form.patchValue({
        id: this.selectedUser.id,
        username: this.selectedUser.username,
        password: '',
        userFullName: this.selectedUser.userFullName,
        isActive: this.selectedUser.isActive,
        dateOfBirth: this.formatDate(this.selectedUser.dateOfBirth),
      });
      this.isSubmitted = false;
    }
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    this.userService
      .updateUser(this.form.value.id, this.form.value)
      .subscribe({
        next: () => {
          this.successMessage = 'User updated successfully!';
          this.errorMessage = '';
          this.userUpdated.emit();
        },
        error: () => {
          this.errorMessage = 'Failed to update user';
          this.successMessage = '';
        },
      });
  }

  cancelEdit(): void {
    this.cancelUpdate.emit();
  }

  hasDisplayableError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(
      control?.invalid &&
      (this.isSubmitted || control.touched || control.dirty)
    );
  }

  formatDate(date: Date): string {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  }
}
