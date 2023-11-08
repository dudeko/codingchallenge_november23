import { useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import Employee from "../model/Employee"

interface EmployeeSearchFormProp {
    onSearchEmployee: (employee: Employee) => Promise<void>
}

const EmployeeSearchForm = ({ onSearchEmployee } : EmployeeSearchFormProp) => {

    const [employeeSearchData, setEmployeeSearchData] = useState({name: '', address:{ city: '', state: ''}} as Employee)

    const handleChange = (propertyName: string) => {
        return (event: any) => setEmployeeSearchData((prevEmployeeSearchData: any) => {
          return {...prevEmployeeSearchData, [propertyName]: event.target.value }
        })
      }

    const handleAddressChange = (propertyName: string) => {
        return (event: any) => setEmployeeSearchData((prevEmployeeSearchData: any) => {
            return {...prevEmployeeSearchData, address: { ...prevEmployeeSearchData.address, [propertyName]: event.target.value} }
        })
    }

    const handleEnterKey = (event: any) => {
      if (event.key === "Enter") {
        onSearchEmployee(employeeSearchData)
      }
    }

    return <>
        <Row className='mb-3'>
            <Form.Group as={Col} xs={12} md={5} className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control onChange={handleChange("name")} onKeyDown={handleEnterKey} />
            </Form.Group>
            <Form.Group as={Col} xs={12} md={3} className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control onChange={handleAddressChange("city")} onKeyDown={handleEnterKey}  />
            </Form.Group>
            <Form.Group as={Col} xs={12} md={2} className="mb-3">
                <Form.Label>State</Form.Label>
                <Form.Control onChange={handleAddressChange("state")} onKeyDown={handleEnterKey}  />
            </Form.Group>
            <Col md={1} sm xs style={{ paddingTop: 32 }}>
                <Button variant={'secondary'} onClick={() => onSearchEmployee(employeeSearchData)}>Search</Button>
            </Col>
        </Row>
    </>
}

export default EmployeeSearchForm