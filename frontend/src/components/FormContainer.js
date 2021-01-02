import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'

const FormContainer = ({ children }) => {
  return (
    <Container className='mt-5 mb-5'>
      <Row className=' justify-content-md-center '>
        <Col xs={12} md={6}>
          <Card className='my-3 p-3 rounded card-login'>{children}</Card>
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer
