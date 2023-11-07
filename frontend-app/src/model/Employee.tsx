import Address from "./Address";
import EmployeeDocument from "./EmployeeDocument";

export default interface Employee {
    id: number,
    name: string,
    cpfDocument: string,
    email: string,
    cellphoneNumber: string,
    birthDate: string,
    address: Address,
    employeeDocumentList: EmployeeDocument[]
}