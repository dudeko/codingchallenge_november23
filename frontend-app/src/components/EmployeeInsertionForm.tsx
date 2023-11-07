import { useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import Employee from "../model/Employee"
import DocumentType from "../model/DocumentType"
import EmployeeDocument from "../model/EmployeeDocument"
import { toFormData } from "axios"

interface EmployeeInsertionFormProp {
    onSaveEmployee: (formData: FormData) => Promise<void>
}

const EmployeeInsertionForm = ({ onSaveEmployee } : EmployeeInsertionFormProp) => {

    const [employee, setEmployee] = useState<Employee>({} as Employee)

    const handleChange = (propertyName: string) => {
        return (event: any) => setEmployee((prevEmployee: any) => {
            return {...prevEmployee, [propertyName]: event.target.value }
        })
    }

    const handleAddressChange = (propertyName: string) => {
        return (event: any) => setEmployee((prevEmployee: any) => {
            return {...prevEmployee, address: { ...prevEmployee.address, [propertyName]: event.target.value} }
        })
    }

    const handleFileChange = (documentType: string) => {
        return (event: any) => setEmployee((prevEmployee: any) => {
            const file = event.target.files[0]
            validateFileMaxPages(file, event)
            if (prevEmployee.employeeDocumentList) {
                const updatedDocumentList = [...prevEmployee.employeeDocumentList]
                const previousFileIndex = updatedDocumentList.findIndex((item: EmployeeDocument) => item.documentType === documentType)
                if (previousFileIndex > -1) {
                    updatedDocumentList[previousFileIndex].file = file
                    return {...prevEmployee, employeeDocumentList: updatedDocumentList }
                }
                return {...prevEmployee, employeeDocumentList: [...prevEmployee.employeeDocumentList, { documentType, file }] }
            }
            return {...prevEmployee, employeeDocumentList: [{ documentType, file }] }
        })
    }

    const validateFileMaxPages = (file: File, event: any) => {
        const reader = new FileReader()
        reader.readAsBinaryString(file)
        reader.onloadend = () => {
            const count = `${reader.result}`.match(/\/Type[\s]*\/Page[^s]/g)?.length || 0
            console.log('Number of Pages:', count)
            if (count > 2) {
                event.target.value = ''
                throw new Error("Teste")
            }
        }
    }

    const prepareFormDataAndSave = () => {
        const axiosFormData: FormData = toFormData(employee, undefined, { indexes: false, dots: true }) as FormData
        const serverPreparedFormData: FormData = new FormData()
        for (const [key, value] of axiosFormData.entries()) {
            if (key.includes('employeeDocumentList.')) {
                const newKey = 'employeeDocumentList[' + key.split('.').at(-2) + '].' + key.split('.').at(-1)
                serverPreparedFormData.append(newKey, value)
            } else {
                serverPreparedFormData.append(key, value)
            }
        }
        onSaveEmployee(serverPreparedFormData)
    }

    return <>
        <Row>
            <Form.Group as={Col} sm={12} md={4} className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control onChange={handleChange("name")} />
            </Form.Group>
            <Form.Group as={Col} sm={12} md={4} className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" onChange={handleChange("birthDate")} />
            </Form.Group>
            <Form.Group as={Col} sm={12} md={4} className="mb-3">
                <Form.Label>CPF</Form.Label>
                <Form.Control onChange={handleChange("cpfDocument")} />
            </Form.Group>
            <Form.Group as={Col} sm={12} md={4} className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" onChange={handleChange("email")} />
            </Form.Group>
            <Form.Group as={Col} sm={12} md={4} className="mb-3">
                <Form.Label>Cellphone Number</Form.Label>
                <Form.Control onChange={handleChange("cellphoneNumber")} />
            </Form.Group>
        </Row>
        <Row>
            <Form.Group as={Col} xs={12} sm={5} className="mb-3">
                <Form.Label>Street</Form.Label>
                <Form.Control onChange={handleAddressChange("street")} />
            </Form.Group>
            <Form.Group as={Col} xs={12} sm={2} className="mb-3">
                <Form.Label>Number</Form.Label>
                <Form.Control onChange={handleAddressChange("number")} />
            </Form.Group>
        </Row>
        <Row>
            <Form.Group as={Col} xs={12} sm={5} className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control onChange={handleAddressChange("city")} />
            </Form.Group>
            <Form.Group as={Col} xs={12} sm={2} className="mb-3">
                <Form.Label>State</Form.Label>
                <Form.Control onChange={handleAddressChange("state")} />
            </Form.Group>
        </Row>
        <Row className="mt-3">
            <Form.Group as={Col} xs={12} sm={5} className="mb-3">
                <Form.Label>Contract</Form.Label>
                <Form.Control type='file' onChange={handleFileChange(DocumentType.CONTRACT)} />
            </Form.Group>
            <Form.Group as={Col} xs={12} sm={5} className="mb-3">
                <Form.Label>CPF/RG</Form.Label>
                <Form.Control type='file' onChange={handleFileChange(DocumentType.CPF_RG)} />
            </Form.Group>
            <Form.Group as={Col} xs={12} sm={5} className="mb-3">
                <Form.Label>Proof of Address</Form.Label>
                <Form.Control type='file' onChange={handleFileChange(DocumentType.PROOF_OF_ADDRESS)} />
            </Form.Group>
            <Form.Group as={Col} xs={12} sm={5} className="mb-3">
                <Form.Label>School Curriculum</Form.Label>
                <Form.Control type='file' onChange={handleFileChange(DocumentType.SCHOOL_CURRICULUM)} />
            </Form.Group>
        </Row>
        <Row className="mt-3">
            <Col sm={12}>
                <Button onClick={prepareFormDataAndSave}>Save</Button>
            </Col>
        </Row>
    </>
}

export default EmployeeInsertionForm