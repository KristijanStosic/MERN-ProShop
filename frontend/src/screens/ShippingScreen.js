import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1 className='text-center'>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group
          controlId='address'
          className=' d-block m-auto w-75 h-auto shipping'
        >
          <Form.Label style={{ fontWeight: 'bold' }}>Address</Form.Label>

          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group
          controlId='city'
          className=' d-block m-auto w-75 h-auto shipping'
        >
          <Form.Label style={{ fontWeight: 'bold' }}>City</Form.Label>

          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group
          controlId='postalCode'
          className=' d-block m-auto w-75 h-auto shipping'
        >
          <Form.Label style={{ fontWeight: 'bold' }}>Postal Code</Form.Label>

          <Form.Control
            type='text'
            placeholder='Enter postal code'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group
          controlId='country'
          className=' d-block m-auto w-75 h-auto shipping'
        >
          <Form.Label style={{ fontWeight: 'bold' }}>Country</Form.Label>

          <Form.Control
            type='text'
            placeholder='Enter country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          className='d-block mx-auto mt-4 w-50 shipping-button'
          type='submit'
          variant='outline-dark'
        >
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
