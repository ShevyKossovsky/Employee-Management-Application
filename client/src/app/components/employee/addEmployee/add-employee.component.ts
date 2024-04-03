import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '../../../services/employee/employee.service';
import { PositionService } from '../../../services/positions/position.service';
import { Position } from '../../../models/position.model';

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
      idNumber: ['',[Validators.required, Validators.pattern(/^\d{9}$/)]], // ווידטור של pattern מוודא שהתעודת זהות מכילה 9 ספרות
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
      isManagement: [false],
      entryDate: ['', [Validators.required, this.entryDateValidator()]]}));
  }

  entryDateValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const entryDate = new Date(control.value);
      const startOfWorkDate = new Date(this.employeeForm.get('employmentStartDate').value);
      return entryDate >= startOfWorkDate ? null : { 'entryDateInvalid': true };
    };
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
      this.employeeService.addEmployee(formData).subscribe(
        () => {
          this.openSnackBar();
          this.dialogRef.close();
        },
        error => {
          console.error('Error adding employee:', error);
          // Check if the error response contains validation errors from the server
          if (error.error.errors) {
            const errorMessage = 'Server validation errors: ' + Object.values(error.error.errors).join(', ');
            this.openErrorSnackBar(errorMessage);
          } else {
            this.openErrorSnackBar('An error occurred while adding employee.');
          }
        }
      );
    } else {
      this.employeeForm.markAllAsTouched();
      console.error('Form is not valid');
      this.openErrorSnackBar('Form is not valid. Please fill all required fields.');
    }
  }
  
  openErrorSnackBar(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
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
    });
  }
}
