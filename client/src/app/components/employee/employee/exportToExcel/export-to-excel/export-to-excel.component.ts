import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Employee } from '../../../../../models/employee.model';
import { EmployeeService } from '../../../../../services/employee/employee.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-export-to-excel',
  templateUrl: './export-to-excel.component.html',
  styleUrls: ['./export-to-excel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExportToExcelComponent implements OnInit {

  employeesData!: Employee[];

  constructor(private _employeeService: EmployeeService) { }
  
  ngOnInit(): void {
    this._employeeService.getAllEmployees().subscribe(employees => {
      this.employeesData = employees;
      console.log(this.employeesData);
    }); 
  }

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.employeesData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Employees');
    XLSX.writeFile(wb, 'employees.xlsx');
  }
}
