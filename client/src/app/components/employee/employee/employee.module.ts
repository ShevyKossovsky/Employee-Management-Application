import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ExportToExcelComponent } from "./exportToExcel/export-to-excel/export-to-excel.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';



@NgModule({
    declarations: [EmployeeListComponent,ExportToExcelComponent],
    imports: [
        CommonModule,
        EmployeeRoutingModule,
        TableModule,
        ButtonModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule
   
    ]
})
export class EmployeeModule { }

