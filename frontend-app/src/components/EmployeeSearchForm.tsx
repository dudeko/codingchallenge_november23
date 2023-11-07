import { useState } from "react"
import { Button, Col, FormControl, Row } from "react-bootstrap"
import Employee from "../model/Employee"

interface EmployeeSearchFormProp {
    onSearchEmployee: (employee: Employee) => Promise<void>
}

const EmployeeSearchForm = ({ onSearchEmployee } : EmployeeSearchFormProp) => {

    const [employeeSearchData, setEmployeeSearchData] = useState({} as Employee)

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

    return <>
        <Row className='mb-3'>
            <Col lg={12} md={5} sm xs>
                <label>Name<FormControl onChange={handleChange("name")}></FormControl></label>
            </Col>
            <Col lg={12} md={3} sm xs>
                <label>City<FormControl onChange={handleAddressChange("city")}></FormControl></label>
            </Col>
            <Col lg={12} md={2} sm xs>
                <label>State<FormControl onChange={handleAddressChange("state")}></FormControl></label>
            </Col>
            <Col lg={12} md={2} sm xs className='text-center mt-4'>
                <Button className='' onClick={() => onSearchEmployee(employeeSearchData)}>Search</Button>
            </Col>
        </Row>
    </>
}

export default EmployeeSearchForm