import { Table } from "react-bootstrap"
import Employee from "../model/Employee"
import { getLabel } from "../model/DocumentType"

interface EmployeeListProps {
    list: Employee[]
}

const EmployeeList = ({ list } : EmployeeListProps) => {

    const tableHeaders = [
        '#',
        'Name',
        'Date of Birth',
        'CPF',
        'Email',
        'Cellphone Number',
        'Address',
        'Documents'
    ]

    if (list.length === 0) {
        return "No items found."
    }

    const getDateWithoutTimezone = (dateString: string) => {
        const dateArray: string[] = dateString.split("-")
        const year: number = parseInt(dateArray[0])
        const month: number = parseInt(dateArray[1], 10) - 1
        const date: number = parseInt(dateArray[2])
        return new Date(year, month, date).toLocaleDateString()
    }

    return <Table striped bordered hover>
        <thead><tr>{tableHeaders.map(header => <th>{header}</th>)}</tr></thead>
        <tbody>
        {list.map(item => {
            return <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.birthDate ? getDateWithoutTimezone(item.birthDate) : ''}</td>
                <td>{item.cpfDocument}</td>
                <td>{item.email}</td>
                <td>{item.cellphoneNumber}</td>
                <td>{item.address?.getFullAddress()}</td>
                <td>{item.employeeDocumentList.map(doc => <><a href={`${item.id}/${doc.filename}`}>{getLabel(doc.documentType)}</a><br /></>)}</td>
            </tr>
        })}
        </tbody>
    </Table>
}

export default EmployeeList