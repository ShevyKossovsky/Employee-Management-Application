
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Employee } from '../../../models/employee.model';
import { Position } from '../../../models/position.model';
import { PositionService } from '../../../services/positions/position.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent {
  employeeForm: FormGroup;
  positions: Position[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee },
    private employeeService: EmployeeService,
    private _snackBar: MatSnackBar,
    private positionService: PositionService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadPositions();
    this.setEmployeeData();
  }

  initializeForm(): void {
    this.employeeForm = this.fb.group({
      id: [this.data.employee.id],
      idNumber: [this.data.employee.idNumber, [Validators.required, Validators.pattern(/^\d{9}$/)]],
      firstName: [this.data.employee.firstName, Validators.required],
      lastName: [this.data.employee.lastName, Validators.required],
      gender: [this.data.employee.gender, Validators.required],
      dateOfBirth: [this.data.employee.dateOfBirth, Validators.required],
      employmentStartDate: [this.data.employee.employmentStartDate, Validators.required],
      positionsList: this.fb.array([], Validators.required)
    });

    this.data.employee.positionsList.forEach(position => {
      this.addPositionControl(position);
    });
  }

  setEmployeeData(): void {
    const employeeData = this.data.employee;
    this.employeeForm.setControl('positionsList', this.fb.array([]));
    employeeData.positionsList.forEach(position => {
      this.addPositionControl(position);
    });
  }

  get positionsFormArray(): FormArray {
    return this.employeeForm.get('positionsList') as FormArray;
  }

  loadPositions(): void {
    this.positionService.getAllPositions().subscribe(positions => {
      this.positions = positions;
    });
  }

  addPositionControl(position?: any): void {
    const positionGroup = this.fb.group({
      positionId: [position ? position.id : '', Validators.required],
      isManagement: [position ? position.isManagement : false, Validators.required],
      entryDate: [position ? position.entryDate : '', [Validators.required, this.entryDateValidator()]]
    });
    this.positionsFormArray.push(positionGroup);
  }

  removePositionControl(index: number): void {
    this.positionsFormArray.removeAt(index);
  }

  isPositionDisabled(positionId: number, index: number): boolean {
    const selectedPositions = this.employeeForm.value.positionsList.map((pos: any) => pos.positionId);
    return selectedPositions.includes(positionId) && selectedPositions.indexOf(positionId) !== index;
  }

  entryDateValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const entryDate = new Date(control.value);
      const startOfWorkDate = new Date(this.employeeForm.get('employmentStartDate').value);
      return entryDate >= startOfWorkDate ? null : { 'entryDateInvalid': true };
    };
  }

  submit(): void {
    if (this.employeeForm.valid) {
      const formData = this.employeeForm.value;
      this.employeeService.updateEmployee(formData.id, formData).subscribe(
        () => {
          this.openSnackBar('Employee edited successfully');
          this.dialogRef.close(true);
        },
        error => {
          console.error('Error editing employee:', error);
          if (error.error.errors) {
            const errorMessage = 'Server validation errors: ' + Object.values(error.error.errors).join(', ');
            this.openSnackBar(errorMessage);
          } else {
            this.openSnackBar('An error occurred while editing employee.');
          }
        }
      );
    } else {
      console.error('Form is not valid');
      this.openSnackBar('Form is not valid. Please fill all required fields.');
    }
  }

  openSnackBar(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
      panelClass: ['custom-snackbar']
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
