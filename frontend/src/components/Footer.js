import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container className='bg-dark' fluid>
        <Row>
          <Col className='text-center text-light py-3 footer-text'>
            Copyright &copy; ProShop
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
