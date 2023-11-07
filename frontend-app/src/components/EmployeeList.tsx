import { Table } from "react-bootstrap"
import Employee from "../model/Employee"

interface EmployeeListProps {
    list: Employee[]
}

const EmployeeList = ({ list } : EmployeeListProps) => {
    if (list.length === 0) {
        return "No items found."
    }
    return <Table striped bordered hover>
        <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Cellphone Number</th>
            <th>Address</th>
        </tr>
        </thead>
        <tbody>
        {list.map(item => {
            return <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.birthDate ? new Date(item.birthDate).toDateString() : ''}</td>
                <td>{item.cpfDocument}</td>
                <td>{item.email}</td>
                <td>{item.cellphoneNumber}</td>
                <td>{item.address?.getFullAddress()}</td>
                <td>{item.employeeDocumentList.map(doc => <><a href={`${item.id}/${doc.filename}`}>{doc.documentType}</a><br /></>)}</td>
            </tr>
        })}
        </tbody>
    </Table>
}

export default EmployeeList