
import { Routes } from '@angular/router';
import "@angular/compiler";

export const routes: Routes = [
    { path: '', redirectTo: 'employees', pathMatch: 'full' },
    { path: 'employees', loadChildren: () => import('../app/components/employee/employee/employee.module').then(m => m.EmployeeModule) }
];
