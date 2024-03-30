import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { DeleteEmployeeComponent } from './deleteEmployee/delete-employee.component';
import { ExportToExcelComponent } from './exportToExcel/export-to-excel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EmployeeScreenComponent } from './employee-screen/employee-screen.component';
import { AddEmployeeComponent } from './addEmployee/add-employee.component';
import { AddEmployeeButtonComponent } from './add-employee-button/add-employee-button.component';


@NgModule({
    declarations: [
        EmployeeListComponent,
        ExportToExcelComponent,
        DeleteEmployeeComponent,
        EmployeeScreenComponent,
        EmployeeListComponent,
        AddEmployeeComponent,
        AddEmployeeButtonComponent
    ],
    imports: [

        CommonModule,
        EmployeeRoutingModule,
        TableModule,
        ButtonModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatTooltipModule,
        MatDialogModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatCheckboxModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,

    ],
    providers: [
        { provide: MatDialogRef, useValue: {} }
      ]
})
export class EmployeeModule { }
