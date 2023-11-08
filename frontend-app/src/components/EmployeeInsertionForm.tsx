import { Button, Col, Form, Row } from "react-bootstrap"
import Employee from "../model/Employee"
import DocumentType, { getLabel } from "../model/DocumentType"
import { toFormData } from "axios"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import { useEffect } from "react"

interface EmployeeInsertionFormProp {
    onSaveEmployee: (formData: FormData) => Promise<void>
    onValidationError: (errorMessage: string) => void
}

const EmployeeInsertionForm = ({ onSaveEmployee, onValidationError } : EmployeeInsertionFormProp) => {

    const { register, handleSubmit, control } = useForm<Employee>()
    const { fields, append, update } = useFieldArray({
        control,
        name: "employeeDocumentList"
    });
    const onSubmit: SubmitHandler<Employee> = (employee: Employee) => {
        prepareFormDataAndSave(employee)
    }

    useEffect(() => {
        append({ documentType: DocumentType.CONTRACT })
        append({ documentType: DocumentType.CPF_RG })
        append({ documentType: DocumentType.PROOF_OF_ADDRESS })
        append({ documentType: DocumentType.SCHOOL_CURRICULUM })
    }, [])

    const handleFileChange = (documentType: string) => {
        return (event: any) => {
            const file: File = event.target.files[0]
            const fileIsValid: boolean = validateFileMaxPages(file, event)
            if (fileIsValid) {
                const fieldIndex = fields.findIndex(field => field.documentType === documentType)
                update(fieldIndex, { file, documentType })
            }
        }
    }

    const validateFileMaxPages = (file: File, event: any): boolean => {
        const filerReader = new FileReader()
        filerReader.readAsBinaryString(file)
        filerReader.onloadend = () => {
            const count = `${filerReader.result}`.match(/\/Type[\s]*\/Page[^s]/g)?.length || 0
            if (count > 2) {
                onValidationError('Documents can have 2 pages at most.')
                event.target.value = ''
                return false
            }
        }
        return true
    }

    const prepareFormDataAndSave = (employee: Employee) => {
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
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Form.Group as={Col} sm={12} md={4} className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control { ...register('name', { required: true }) } />
                </Form.Group>
                <Form.Group as={Col} sm={12} md={4} className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" { ...register("birthDate", { required: true })} />
                </Form.Group>
                <Form.Group as={Col} sm={12} md={4} className="mb-3">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control { ...register("cpfDocument", { required: true })} />
                </Form.Group>
                <Form.Group as={Col} sm={12} md={4} className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" { ...register("email", { required: true })} />
                </Form.Group>
                <Form.Group as={Col} sm={12} md={4} className="mb-3">
                    <Form.Label>Cellphone Number</Form.Label>
                    <Form.Control { ...register("cellphoneNumber", { required: true })} />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} xs={12} sm={5} className="mb-3">
                    <Form.Label>Street</Form.Label>
                    <Form.Control { ...register("address.street", { required: true })} />
                </Form.Group>
                <Form.Group as={Col} xs={12} sm={2} className="mb-3">
                    <Form.Label>Number</Form.Label>
                    <Form.Control { ...register("address.number", { required: true })} />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} xs={12} sm={5} className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control { ...register("address.city", { required: true }) } />
                </Form.Group>
                <Form.Group as={Col} xs={12} sm={2} className="mb-3">
                    <Form.Label>State</Form.Label>
                    <Form.Control { ...register("address.state", { required: true })} />
                </Form.Group>
            </Row>
            <Row className="mt-3">
                {fields.map(({ id, documentType }, index) => {
                    return <>
                        <Form.Group key={id} as={Col} xs={12} sm={5} className="mb-3">
                            <Form.Label>{getLabel(documentType)}</Form.Label>
                            <Form.Control type='file' { ...register(`employeeDocumentList.${index}`, { required: false, onChange: handleFileChange(documentType) }) } />
                        </Form.Group>
                    </>
                })}
            </Row>
            <Row className="mt-3">
                <Col sm={12}>
                    <Button type="submit">Save</Button>
                </Col>
            </Row>
        </Form>
    </>
}

export default EmployeeInsertionForm