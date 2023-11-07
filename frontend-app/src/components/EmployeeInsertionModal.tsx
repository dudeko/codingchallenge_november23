import Modal from 'react-bootstrap/Modal'

const EmployeeInsertionModal = ({children, title, isOpened, onClose}: any) => {
  return <Modal size="lg" show={isOpened} onHide={onClose} backdrop="static">
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {children}
    </Modal.Body>
  </Modal>
}

export default EmployeeInsertionModal