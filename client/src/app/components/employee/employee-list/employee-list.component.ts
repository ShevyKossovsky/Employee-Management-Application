import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Employee } from '../../../models/employee.model';
import { DeleteEmployeeComponent } from '../deleteEmployee/delete-employee.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';

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

  constructor(private employeeService: EmployeeService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngAfterViewInit() {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (res: Employee[]) => {
        this.employees = res;
        this.dataSource = new MatTableDataSource(this.employees);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error(err);
      }
    });
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
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getEmployees();
      }
    });
  }

  editEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      data: { employee }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getEmployees(); // Refresh the employee list after editing
      }
    });
  }


  viewEmployeeDetails(employee: Employee): void {
    const dialogRef = this.dialog.open(EmployeeDetailsComponent, {
      data: { employee },
      width:'500px'
    });  
    
  }

    
}
