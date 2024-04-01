import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrl: './delete-employee.component.scss'
})
export class DeleteEmployeeComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee },
    private _employeeService: EmployeeService,
    private _snackBar: MatSnackBar
  ) { }


  cancel(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    if (this.data.employee) {
      this._employeeService.deleteEmployee(this.data.employee.id).subscribe(
        response => {

          console.log('Employee deleted successfully:', response);
          this.openSnackBar();
          this.dialogRef.close();

        },
        error => {
          console.error('Error deleting employee:', error);
          this.dialogRef.close();
        }
      );
    } else {
      console.error('No employee ID provided for deletion');
      this.dialogRef.close();
    }
  }

  openSnackBar() {
    const snackBarRef = this._snackBar.open('Employee deleted successfully', undefined, {
      duration: 2000, // Duration of the SnackBar display in milliseconds
    });
    snackBarRef.afterDismissed().subscribe(() => {
      window.location.reload();
    });
  }
}
