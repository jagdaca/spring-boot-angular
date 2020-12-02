import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { CreateEmployeeComponent } from './create-employee/create-employee.component';
// import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
// import { EmployeeListComponent } from './employee-list/employee-list.component';
// import { UpdateEmployeeComponent } from './update-employee/update-employee.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  
  // {path: 'employees', component: EmployeeListComponent},
  // {path: 'create-employee', component: CreateEmployeeComponent},
  // {path: 'update-employee/:id', component: UpdateEmployeeComponent},
  // {path: 'employee-details/:id', component: EmployeeDetailsComponent},

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'users', component: UserListComponent},

  {path: '', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
