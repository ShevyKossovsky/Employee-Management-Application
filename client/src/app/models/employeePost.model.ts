import { EmployeePosition } from "./employeePosition.model";

export class EmployeePost {
    firstName!: string;
    lastName!: string;
    idNumber!: string;
    gender!: string;
    employmentStartDate!: Date;
    dateOfBirth!: Date;
    positionsList!: EmployeePosition[];
}