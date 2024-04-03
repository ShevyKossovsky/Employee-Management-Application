import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../addEmployee/add-employee.component';

@Component({
  selector: 'app-add-employee-button',
 
  templateUrl: './add-employee-button.component.html',
  styleUrl: './add-employee-button.component.scss'
})
export class AddEmployeeButtonComponent {
  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(AddEmployeeComponent, {
      width: '600px',
    });
  }
}
