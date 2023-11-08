import Address from "./Address";
import EmployeeDocument from "./EmployeeDocument";

export default class Employee {

    id?: number
    name = ''
    cpfDocument = ''
    email = ''
    cellphoneNumber = ''
    birthDate = ''
    address = new Address()
    employeeDocumentList: EmployeeDocument[] = []

    constructor(employee?: Employee) {
        if (employee) {
            this.name = employee.name
            this.cpfDocument = employee.cpfDocument
            this.email = employee.email
            this.cellphoneNumber = employee.cellphoneNumber
            this.birthDate = employee.birthDate
            this.address = new Address(employee.address)
            this.employeeDocumentList = employee.employeeDocumentList ? [...employee.employeeDocumentList] : []
        }
    }
}