import { useEffect, useState } from 'react'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'

interface ToastMessageProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

const ToastMessage = ({ show = false, message, onClose }: ToastMessageProps) => {
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
      <Toast show={showMessage} onClose={toggleShowMessage} delay={5000} autohide bg='success' className="d-inline-block m-1">
        <Toast.Header>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  </>
}

export default ToastMessage