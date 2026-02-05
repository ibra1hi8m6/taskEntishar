import { Routes } from '@angular/router';
import { authGuard } from './Core/auth-guard-guard';
import { UserManagementComponent } from './components/user-management/user-management';
import { HomeComponent } from './components/home/home';
import { LoginComponent } from './components/login/login';
import { AddUserComponent } from './components/user-management/add-user/add-user';
import { UpdateUserComponent } from './components/user-management/update-user/update-user';
import { UserListComponent } from './components/user-management/user-list/user-list';
import { DeleteUserComponent } from './components/user-management/delete-user/delete-user';

export const routes: Routes = [ { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'users', component: UserManagementComponent, canActivate: [authGuard],
    children: [
   
      { path: 'add', component: AddUserComponent },
      { path: 'update/:id', component: UpdateUserComponent },
      { path: 'list', component: UserListComponent },
       { path: 'delete/:id', component: DeleteUserComponent }
    ]
   }];
