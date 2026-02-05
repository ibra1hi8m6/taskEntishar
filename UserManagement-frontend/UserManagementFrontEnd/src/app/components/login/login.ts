import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-services/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  form: FormGroup;
  isSubmitted = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    this.authService.login(this.form.value).subscribe({
      next: () => this.router.navigate(['/home']),
      error: () => this.errorMessage = 'Invalid credentials or inactive user'
    });
  }

  hasDisplayableError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(
      control?.invalid &&
      (this.isSubmitted || control.touched || control.dirty)
    );
  }
}
