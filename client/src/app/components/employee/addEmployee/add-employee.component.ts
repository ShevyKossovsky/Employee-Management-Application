import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '../../../services/employee/employee.service';
import { PositionService } from '../../../services/positions/position.service';
import { Position } from '../../../models/position.model';
import { EGender, Employee } from '../../../models/employee.model';
import { EmployeePost } from '../../../models/employeePost.model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {
  employeeForm!: FormGroup;
  positionsList: Position[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEmployeeComponent>,
    private employeeService: EmployeeService,
    private positionService: PositionService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadPositions();
  }




  initializeForm(): void {
    this.employeeForm = this.fb.group({
      idNumber: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required], 
      dateOfBirth: ['', Validators.required],
      employmentStartDate: ['', Validators.required],
      positionsList: this.fb.array([], Validators.required)
    });
  }



  get positionsFormArray(): FormArray {
    return this.employeeForm.get('positionsList') as FormArray;
  }

  loadPositions(): void {
    this.positionService.getAllPositions().subscribe(positions => {
      this.positionsList = positions;
      this.addPositionControl();
    });
  }

  addPositionControl(): void {
    this.positionsFormArray.push(this.fb.group({
      positionId: ['', Validators.required],
      isManagement: [false, Validators.required],
      entryDate: ['', Validators.required]
    }));
  }

  removePositionControl(index: number): void {
    this.positionsFormArray.removeAt(index);
  }

  isPositionDisabled(positionId: number, index: number): boolean {
    const selectedPositions = this.employeeForm.value.positionsList.map((pos: any) => pos.positionId);
    return selectedPositions.includes(positionId) && selectedPositions.indexOf(positionId) !== index;
  }
  
  submit(): void {
    if (this.employeeForm.valid) {
      const formData = this.employeeForm.value;
      this.employeeService.addEmployee(formData).subscribe(() => {
        this.openSnackBar();
        this.dialogRef.close(); // Handle success, e.g., close dialog
             }, error => {
        console.error('Error adding employee:', error);
        // Display server validation errors
        console.log('Server validation errors:', error.error.errors);
      });
    } else {
      this.employeeForm.markAllAsTouched();
      console.error('Form is not valid');
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  openSnackBar() {
    const snackBarRef = this._snackBar.open('Employee added successfully', undefined, {
      duration: 2000,
      panelClass: ['custom-snackbar']
    });
    snackBarRef.afterDismissed().subscribe(() => {
      window.location.reload();
    });
  }
}
