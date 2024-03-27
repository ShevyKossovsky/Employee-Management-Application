import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { Route, RouterModule } from '@angular/router';

const EMPLOYEE_ROUTER: Route[] = [
  { path: '', redirectTo: 'all-employees', pathMatch: 'full' },
  { path: 'all-employees', component: EmployeeListComponent }, 
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(EMPLOYEE_ROUTER)
  ],
  exports: [RouterModule],
})
export class EmployeeRoutingModule { }
