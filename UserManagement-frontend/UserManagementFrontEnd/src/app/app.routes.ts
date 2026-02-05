import { Routes } from '@angular/router';
import { authGuard } from './Core/auth-guard-guard';
import { UserManagementComponent } from './components/user-management/user-management';
import { HomeComponent } from './components/home/home';
import { LoginComponent } from './components/login/login';

export const routes: Routes = [ { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'users', component: UserManagementComponent, canActivate: [authGuard] }];
