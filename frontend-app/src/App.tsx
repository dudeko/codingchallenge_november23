import { useEffect, useState } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import ToastMessage from './components/ToastMessage'

function App() {
  const [isListLoading, setIsListLoading] = useState<boolean>(false)
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState<boolean>(false)
  const [sampleList, setSampleList] = useState<any[]>([])

  useEffect(() => {
    loadSampleList()
  }, [])


//   const sendNotification = async () => {
//     setIsSendMessageProcessing(true)
//     try {
//       const payload = { category: selectedCategory, message: notificationMessage }
//       const response = await axios.post('http://localhost:8080/notification/send', payload)
//       showSuccessMessage(response.data.message)
//       loadNotificationLogList()
//     } catch(error: any) {
//       console.error(error.response.data.message || error.message)
//     } finally {
//       setIsSendMessageProcessing(false)
//     }
//   }

  const loadSampleList = async () => {
    try {
      setIsListLoading(true)
      const response = await axios.get('http://localhost:8080/sample/test')
      setSampleList(response.data)
    } catch(error: any) {
      console.error(error.message)
    } finally {
      setIsListLoading(false)
    }
  }

//   const showSuccessMessage = (message: string) => {
//     setIsSuccessMessageVisible(true)
//     setSuccessMessage(message)
//   }

  return (
    <Container data-bs-theme="dark">
      {isListLoading && "Loading..."}
      {sampleList.map(item => <div>{item}</div>)}
      <ToastMessage show={isSuccessMessageVisible} message={"Sucesso"} onClose={() => setIsSuccessMessageVisible(false)} />
    </Container>
  )
}

export default App
