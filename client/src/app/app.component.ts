import { Component } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/employee/header/header.component";
import { EmployeeListComponent } from "./components/employee/employee-list/employee-list.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, HeaderComponent, EmployeeListComponent]
})
export class AppComponent {
  title = 'client';


  
}
