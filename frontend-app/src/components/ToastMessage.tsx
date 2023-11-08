import { useEffect, useState } from 'react'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'

interface ToastMessageProps {
  show: boolean
  message: string
  onClose: () => void
  type?: string
}

const ToastMessage = ({ show = false, message, onClose, type = 'success' }: ToastMessageProps) => {
  const [showMessage, setShowMessage] = useState(show)
  const toggleShowMessage = () => setShowMessage(!showMessage)

  useEffect(() => {
    setShowMessage(show)
  }, [show])

  useEffect(() => {
    !showMessage && onClose()
  }, [showMessage])

  return <>
    <ToastContainer position="top-end">
      <Toast show={showMessage} onClose={toggleShowMessage} delay={5000} autohide bg={type} className="d-inline-block m-3">
        <Toast.Body className={'text-white'}>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  </>
}

export default ToastMessage