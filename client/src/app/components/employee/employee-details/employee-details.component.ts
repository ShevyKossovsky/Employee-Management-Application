import { Component, Inject, Input } from '@angular/core';
import { Employee } from '../../../models/employee.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-details',

  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss'
})
export class EmployeeDetailsComponent {
  constructor(
    private dialogRef: MatDialogRef<EmployeeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee }
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
