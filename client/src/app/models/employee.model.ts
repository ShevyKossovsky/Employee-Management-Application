import { EmployeePosition } from "./employeePosition.model";

export class Employee {
    id!: number;
    firstName!: string;
    lastName!: string;
    idNumber!: string;
    gender!: string;
    employmentStartDate!: Date;
    dateOfBirth!: Date;
    isActive!: boolean;
    positionsList!: EmployeePosition[];
}
