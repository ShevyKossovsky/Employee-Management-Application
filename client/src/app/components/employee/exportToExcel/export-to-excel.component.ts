import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as XLSX from 'xlsx';
import { Observable } from 'rxjs';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Employee } from '../../../models/employee.model';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-export-to-excel',
  templateUrl: './export-to-excel.component.html',
  styleUrls: ['./export-to-excel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExportToExcelComponent implements OnInit {

  constructor(private _employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  exportToExcel(): void {
    this._employeeService.getAllEmployees().subscribe((employees: Employee[]) => {
      const formattedData: any[] = [];
      employees.forEach(employee => {
        employee.positionsList.forEach(position => {
          const rowData = {
            'Employee ID': employee.id,
            'First Name': employee.firstName,
            'Surname': employee.lastName,
            'Identity Number': employee.idNumber,
            'Gender': employee.gender,
            'Date of Birth': this.formatDate(employee.dateOfBirth),
            'Beginning of Work': this.formatDate(employee.employmentStartDate),
            'Position Name': position.position.name,
            'Is Management': position.isManagement ? 'Yes' : 'No',
            'Entry Date': this.formatDate(position.entryDate)
          };
          formattedData.push(rowData);
        });
      });
  
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const now = new Date();
      const formattedDate = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
      const fileName = `employees_${formattedDate}.xlsx`;
      const excelBlob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(excelBlob, fileName);
    }, error => {
      console.error(error); // Log any errors to the console
    });
  }
  
  

  private formatDate(date: Date): string {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
  
    return `${day}/${month}/${year}`;
  }
}
