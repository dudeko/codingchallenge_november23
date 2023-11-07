import { useEffect, useState } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import ToastMessage from './components/ToastMessage'
import { Button, Card, Col, Row } from 'react-bootstrap'
import LoadingIndicator from './components/LoadingIndicator'
import EmployeeList from './components/EmployeeList'
import EmployeeInsertionForm from './components/EmployeeInsertionForm'
import EmployeeSearchForm from './components/EmployeeSearchForm'
import EmployeeInsertionModal from './components/EmployeeInsertionModal'
import Address from './model/Address'
import Employee from './model/Employee'

function App() {
  const [isListLoading, setIsListLoading] = useState<boolean>(false)
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState<boolean>(false)
  const [employeeList, setEmployeeList] = useState<Employee[]>([])
  const [successMessage, setSuccessMessage] = useState<any>([])
  const [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    loadEmployeeList()
  }, [])

  const saveEmployee = async (employeeFormData: FormData) => {
    // setIsSendMessageProcessing(true)
    try {
      const response = await axios.postForm('http://localhost:8080/employee/save', employeeFormData)
      showSuccessMessage(response.data.message)
      loadEmployeeList()
    } catch(error: any) {
      console.error(error.response.data.message || error.message)
    } finally {
      setShowModal(false)
      // setIsSendMessageProcessing(false)
    }
  }

  const searchEmployee = async (employeeSearchData: Employee) => {
    // setIsSendMessageProcessing(true)
    try {
      const response = await axios.post('http://localhost:8080/employee/search', employeeSearchData)
      setEmployeeList(response.data)
    } catch(error: any) {
      console.error(error.response.data.message || error.message)
    } finally {
      // setIsSendMessageProcessing(false)
    }
  }

  const loadEmployeeList = async () => {
    try {
      setIsListLoading(true)
      const response = await axios.get('http://localhost:8080/employee/list')
      const list = response.data.map((item: Employee) => ({ ...item, address: new Address(item.address) }))
      setEmployeeList(list)
    } catch(error: any) {
      console.error(error.message)
    } finally {
      setIsListLoading(false)
    }
  }

  const showSuccessMessage = (message: string) => {
    setIsSuccessMessageVisible(true)
    setSuccessMessage(message)
  }

  return (
    <Container>
      <h2 className='mb-5 mt-5'>Employment Contract Management</h2>
      <Row className='m-3'>
        <Col lg={3}>
          <EmployeeSearchForm onSearchEmployee={searchEmployee} />
        </Col>
        <Col lg={9}>
          <Row className='m-3'>
            <Col>
              <Card>
                <Card.Header>
                  <Button onClick={() => setShowModal(true)}>Create Employee</Button>
                </Card.Header>
                <Card.Body className='text-center'>
                  { isListLoading ? <LoadingIndicator />
                      : <EmployeeList list={employeeList} />
                  }
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <EmployeeInsertionModal title={'New Employee'} isOpened={showModal} onClose={() => setShowModal(false)}>
        <EmployeeInsertionForm onSaveEmployee={saveEmployee} />
      </EmployeeInsertionModal>
      <ToastMessage show={isSuccessMessageVisible} message={successMessage} onClose={() => setIsSuccessMessageVisible(false)} />
    </Container>
  )
}

export default App
