import { useEffect, useState } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import ToastMessage from './components/ToastMessage'
import { Button, Col, Row } from 'react-bootstrap'
import LoadingIndicator from './components/LoadingIndicator'
import EmployeeList from './components/EmployeeList'
import EmployeeInsertionForm from './components/EmployeeInsertionForm'
import EmployeeSearchForm from './components/EmployeeSearchForm'
import EmployeeInsertionModal from './components/EmployeeInsertionModal'
import Address from './model/Address'
import Employee from './model/Employee'

function App() {
  const [isListLoading, setIsListLoading] = useState<boolean>(false)
  const [employeeList, setEmployeeList] = useState<Employee[]>([])
  const [isToastMessageVisible, setIsToastMessageVisible] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [toastType, setToastType] = useState<string>()
  const [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    loadEmployeeList()
  }, [])

  const saveEmployee = async (employeeFormData: FormData) => {
    try {
      const response: any = await axios.postForm('http://localhost:8080/employee/save', employeeFormData)
      showSuccessMessage(response.data.message)
      loadEmployeeList()
    } catch(error: any) {
      console.error(error.response.data.message || error.message)
    } finally {
      setShowModal(false)
    }
  }

  const searchEmployee = async (employeeSearchData: Employee) => {
    try {
      const response = await axios.post('http://localhost:8080/employee/search', employeeSearchData)
      setEmployeeList(convertFromResponse(response))
    } catch(error: any) {
      console.error(error.response.data.message || error.message)
    }
  }

  const convertFromResponse = (response: any) => {
    return response.data.map((item: Employee) => ({ ...item, address: new Address(item.address) }))
  }

  const loadEmployeeList = async () => {
    try {
      setIsListLoading(true)
      const response = await axios.get('http://localhost:8080/employee/list')
      setEmployeeList(convertFromResponse(response))
    } catch(error: any) {
      console.error(error.message)
    } finally {
      setIsListLoading(false)
    }
  }

  const showSuccessMessage = (message: string) => {
    setIsToastMessageVisible(true)
    setMessage(message)
    setToastType('success')
  }

  const showErrorMessage = (message: string) => {
    setIsToastMessageVisible(true)
    setMessage(message)
    setToastType('warning')
  }

  return (
    <Container>
      <h2 className='mb-5 mt-5'>Employment Contract Management</h2>
      <Row className='m-3'>
        <Col>
          <EmployeeSearchForm onSearchEmployee={searchEmployee} />
          <Button className='mb-3' onClick={() => setShowModal(true)}>Add Employee</Button>
        </Col>
      </Row>
        { isListLoading ?
          <Row className='m-3 text-center'><Col><LoadingIndicator /></Col></Row>
          : <EmployeeList list={employeeList} />
        }
      <EmployeeInsertionModal title={'New Employee'} isOpened={showModal} onClose={() => setShowModal(false)}>
        <EmployeeInsertionForm onSaveEmployee={saveEmployee} onValidationError={showErrorMessage} />
      </EmployeeInsertionModal>
      <ToastMessage show={isToastMessageVisible} message={message} type={toastType} onClose={() => setIsToastMessageVisible(false)} />
    </Container>
  )
}

export default App
