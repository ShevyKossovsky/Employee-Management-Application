import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { ExportToExcelComponent } from "./components/employee/exportToExcel/export-to-excel.component";
import { EmployeeListComponent } from "./components/employee/employee-list/employee-list.component";
import { AddEmployeeComponent } from './components/employee/addEmployee/add-employee.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, HeaderComponent]
})
export class AppComponent {
  title = 'client';


  
}
