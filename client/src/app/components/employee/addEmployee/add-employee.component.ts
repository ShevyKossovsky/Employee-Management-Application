import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { EmployeeService } from '../../../services/employee/employee.service';
import { PositionService } from '../../../services/positions/position.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Position } from '../../../models/position.model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent {
  addEmployeeForm!: FormGroup;
  positions: Position[] = [];
  positionsList!: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddEmployeeComponent>,
    private employeeService: EmployeeService,
    private positionService: PositionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadPositions();
  }

  initializeForm(): void {
    this.addEmployeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      idNumber: ['', Validators.required],
      gender: ['', Validators.required],
      employmentStartDate: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      isActive: [true, Validators.required],
      positionsList: this.formBuilder.array([this.createPositionFormGroup()])
    });
  }

  loadPositions(): void {
    this.positionService.getAllPositions().subscribe(
      positions => {
        this.positions = positions;
      },
      error => {
        console.error('Error loading positions:', error);
      }
    );
  }

  createPositionFormGroup(): FormGroup {
    return this.formBuilder.group({
      position: ['', Validators.required],
      entryDate: ['', Validators.required],
      isManagement: [false, Validators.required],
    });
  }

  addPosition(): void {
    const positionsList = this.addEmployeeForm.get('positionsList') as FormArray;
    positionsList.push(this.createPositionFormGroup());
  }

  onSubmit(): void {
    if (this.addEmployeeForm.invalid) {
      return;
    }

    const formData = this.addEmployeeForm.value;
    this.employeeService.addEmployee(formData).subscribe(
      () => {
        this.snackBar.open('Employee added successfully', undefined, { duration: 2000 });
        this.dialogRef.close();
      },
      error => {
        console.error('Error adding employee:', error);
        this.snackBar.open('Error adding employee', undefined, { duration: 2000 });
      }
    );
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
