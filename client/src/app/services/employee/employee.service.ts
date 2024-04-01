import { Injectable } from '@angular/core';
import { GlobalService } from '../global.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { EmployeePost } from '../../models/employeePost.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  url!: string;
  constructor(private http: HttpClient, private globalService: GlobalService) {
    this.url = `${globalService.domainUrl}/Employee`;
  }
  getAllEmployees(): Observable<Employee[]> {
    console.log("I am getting all employees");
    
    return this.http.get<Employee[]>(this.url)

  }
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.url}/${id}`)
  }
  addEmployee(employee: EmployeePost): Observable<EmployeePost[]> {
    return this.http.post<EmployeePost[]>(this.url, employee)
  }

  updateEmployee(id:number,employee: Employee): Observable<Employee> {

     return this.http.put<Employee>(`${this.url}${id}`, employee)
  }

  deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(`${this.url}/${id}`);
  }
}
