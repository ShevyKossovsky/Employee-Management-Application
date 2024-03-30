import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Employee } from '../../../models/employee.model';
import { DeleteEmployeeComponent } from '../deleteEmployee/delete-employee.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent {

  employeesList!: Employee[];

  constructor(private _employeeService: EmployeeService,public dialog: MatDialog) { }
  ngOnInit(): void {
    this._employeeService.getAllEmployees().subscribe(employees => {
      // סינון רשימת העובדים לפי השדה isActive
      this.employeesList = employees.filter(employee => employee.isActive);
      console.log(this.employeesList);
    }); 
  }


 
  openDeleteDialog(employeeId: number): void {
    const dialogRef = this.dialog.open(DeleteEmployeeComponent, {
      data: { employeeId: employeeId }
    });
    
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
  }
}
