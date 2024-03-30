import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { AddEmployeeComponent } from './addEmployee/add-employee.component';
import { EmployeeScreenComponent } from './employee-screen/employee-screen.component';

const EMPLOYEE_ROUTER: Route[] = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: EmployeeScreenComponent }, 

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(EMPLOYEE_ROUTER),
    
  ],
  exports: [RouterModule],
})
export class EmployeeRoutingModule { }
