import { Component } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/employee/header/header.component";
import { EmployeeListComponent } from "./components/employee/employee-list/employee-list.component";
import { AuthService } from './services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./components/employee/login/login.component";
import { LogoutComponent } from "./components/employee/logout/logout.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, HeaderComponent, EmployeeListComponent, CommonModule]
})
export class AppComponent {

  constructor() {}

  
  
}
