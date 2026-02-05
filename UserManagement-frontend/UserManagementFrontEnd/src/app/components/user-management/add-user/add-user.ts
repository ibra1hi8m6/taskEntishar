import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { UserService } from '../../../services/user-services/user-service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-user.html',
  styleUrl: './add-user.css',
})
export class AddUserComponent {
  form: FormGroup;
  isSubmitted = false;

  successMessage = '';
  errorMessage = '';

  @Output() userAdded = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userFullName: ['', Validators.required],
      isActive: [true],
      dateOfBirth: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    this.userService.createUser(this.form.value).subscribe({
      next: () => {
        this.successMessage = 'User created successfully!';
        this.errorMessage = '';
        this.userAdded.emit();
        this.resetForm();
      },
      error: () => {
        this.errorMessage = 'Failed to create user';
        this.successMessage = '';
      },
    });
  }

  resetForm(): void {
    this.form.reset({
      isActive: true,
    });
    this.isSubmitted = false;
  }

  hasDisplayableError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(
      control?.invalid &&
      (this.isSubmitted || control.touched || control.dirty)
    );
  }
}
