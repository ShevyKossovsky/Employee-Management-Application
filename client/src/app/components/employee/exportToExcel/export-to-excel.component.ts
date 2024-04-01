import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as XLSX from 'xlsx';
import { forkJoin } from 'rxjs';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Employee } from '../../../models/employee.model';
import { PositionService } from '../../../services/positions/position.service';
import { Position } from '../../../models/position.model';

@Component({
  selector: 'app-export-to-excel',
  templateUrl: './export-to-excel.component.html',
  styleUrls: ['./export-to-excel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExportToExcelComponent implements OnInit {

  employeesList: Employee[] = [];
  positionsMap: Map<number, string> = new Map<number, string>(); // Map to store positions

  constructor(
    private _employeeService: EmployeeService,
    private _positionService: PositionService
  ) { }

  ngOnInit(): void {
    this.fetchDataForExcel();
  }

  fetchDataForExcel(): void {
    forkJoin({
      employees: this._employeeService.getAllEmployees(),
      positions: this._positionService.getAllPositions()
    }).subscribe(({ employees, positions }) => {
      // Filtering deleted employees
      this.employeesList = employees;

      // Populate positions map with position IDs and names
      positions.forEach((position: Position) => {
        this.positionsMap.set(position.id, position.name);
      });

     
    });
  }
  
  exportToExcel(): void {
    // Create a new array to hold the data for each row in the Excel sheet
    const excelData: any[] = [];
  
    // Iterate over each employee and create a new row with their details
    this.employeesList.forEach(employee => {
      // Extract employee details
      const { idNumber, firstName, lastName,  gender, employmentStartDate, dateOfBirth, positionsList } = employee;
  
      // Iterate over each position of the employee
      positionsList.forEach(position => {
        // Extract position details
        const { positionId, isManagement, entryDate } = position;
  
        // Get position name from positionsMap
        const positionName = this.positionsMap.get(positionId) || 'Unknown';
  
        // Format dates
        const formattedEmploymentStartDate = new Date(employmentStartDate).toLocaleDateString().replace(/\./g, '/');
        const formattedDateOfBirth = new Date(dateOfBirth).toLocaleDateString().replace(/\./g, '/');
        const formattedEntryDate = new Date(entryDate).toLocaleDateString().replace(/\./g, '/');
  
        // Create a new row object with employee details, position name, isManagement, and entryDate
        const row = {
          'ID Number': idNumber,
          'First Name': firstName,
          'Last Name': lastName,
          'Gender': gender,
          'Employment Start Date': formattedEmploymentStartDate,
          'Date of Birth': formattedDateOfBirth,
          'Position': positionName,
          'isManagement': isManagement,
          'Entry Date': formattedEntryDate
        };
  
        // Add the row to the excelData array
        excelData.push(row);
      });
    });
  
    // Convert the excelData array to a worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);
  
    // Create a new workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
  
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Employees');
  
    // Generate the Excel file and prompt the user to download it
    const today = new Date();
    const dateString = today.toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    XLSX.writeFile(wb, `Employees_in_${dateString}.xlsx`);
  }
}
