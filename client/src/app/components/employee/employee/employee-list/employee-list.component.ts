import { Component } from '@angular/core';
import { Employee } from '../../../../models/employee.model';
import { EmployeeService } from '../../../../services/employee/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent {

  employeesList!: Employee[];



  constructor(private _employeeService: EmployeeService) { }


  ngOnInit(): void {

    this._employeeService.getAllEmployees().subscribe(employees => {
      this.employeesList = employees;
      console.log(this.employeesList);
    });


    

  }



}
