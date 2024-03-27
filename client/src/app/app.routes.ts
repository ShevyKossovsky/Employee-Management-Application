import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'employees', loadChildren: () => import('../app/components/employee/employee/employee.module').then(e => e.EmployeeModule) }
];
