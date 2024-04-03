import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
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
import { AddEmployeeButtonComponent } from './add-employee-button/add-employee-button.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { AddEmployeeComponent } from './addEmployee/add-employee.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
    declarations: [
        EmployeeListComponent,
        ExportToExcelComponent,
        DeleteEmployeeComponent,
        EmployeeScreenComponent,
        EmployeeListComponent,
        AddEmployeeButtonComponent,
        HeaderComponent,
        AddEmployeeComponent,
        EditEmployeeComponent,
        EmployeeDetailsComponent
        
    ],
    imports: [

        CommonModule,
        EmployeeRoutingModule,
        MatIconModule,
        MatIconButton,
        MatButtonModule,
        MatTableModule,
        MatTooltipModule,
        MatDialogModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule ,
        MatPaginatorModule,
        MatSlideToggleModule,
        MatExpansionModule,
        MatCardModule ,
        MatDividerModule 

    ],
    providers: [
        { provide: MatDialogRef, useValue: {} }
    ]
})
export class EmployeeModule { }
