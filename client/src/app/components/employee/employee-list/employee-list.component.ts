import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Employee } from '../../../models/employee.model';
import { DeleteEmployeeComponent } from '../deleteEmployee/delete-employee.component';
import { EmployeePosition } from '../../../models/employeePosition.model';
import { Position } from '../../../models/position.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements AfterViewInit {

  employees: Employee[] = [];
  displayedColumns: string[] = ['idNumber', 'firstName', 'lastName', 'startOfWorkDate', 'actions'];
  dataSource!: MatTableDataSource<Employee>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private employeeService: EmployeeService, private dialog: MatDialog) { }
  ngAfterViewInit() {
    this.getEmployees();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openDeleteConfirmation(employee: Employee): void {
    const dialogRef = this.dialog.open(DeleteEmployeeComponent, {
      data: { employee } 
    });
  }

  getEmployees(): Employee[] {
    this.employeeService.getAllEmployees().subscribe({
      next: (res: Employee[]) => {
        this.employees = res;
        this.dataSource = new MatTableDataSource(this.employees);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log("Employees fetched successfully:");
        console.log(this.employees);
      },
      error: (err) => {
        console.log(err);
      }
    });
    return this.employees;
  }
  
}
