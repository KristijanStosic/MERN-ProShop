import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderActions'

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  return (
    <>
      <h1 className='text-primary'>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          className='table-sm text-center text-primary'
          style={{
            backgroundColor: ' #4bbac0',
            border: '1px solid black',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: '1px solid black',
                  fontWeight: 'bold',
                  fontSize: '1.25rem',
                }}
              >
                ID
              </th>
              <th
                style={{
                  border: '1px solid black',
                  fontWeight: 'bold',
                  fontSize: '1.25rem',
                }}
              >
                USER
              </th>
              <th
                style={{
                  border: '1px solid black',
                  fontWeight: 'bold',
                  fontSize: '1.25rem',
                }}
              >
                DATE
              </th>
              <th
                style={{
                  border: '1px solid black',
                  fontWeight: 'bold',
                  fontSize: '1.25rem',
                }}
              >
                TOTAL
              </th>
              <th
                style={{
                  border: '1px solid black',
                  fontWeight: 'bold',
                  fontSize: '1.25rem',
                }}
              >
                PAID
              </th>
              <th
                style={{
                  border: '1px solid black',
                  fontWeight: 'bold',
                  fontSize: '1.25rem',
                }}
              >
                DELIVERED
              </th>
              <th
                style={{
                  border: '1px solid black',
                  fontWeight: 'bold',
                  fontSize: '1.25rem',
                }}
              >
                SHOW
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td style={{ border: '1px solid black' }}>{order._id}</td>
                <td style={{ border: '1px solid black' }}>
                  {order.user && order.user.name}
                </td>
                <td style={{ border: '1px solid black' }}>
                  {order.createdAt.substring(0, 10)}
                </td>
                <td style={{ border: '1px solid black' }}>
                  ${order.totalPrice}
                </td>
                <td
                  style={{
                    border: '1px solid black',
                    textAlign: 'center',
                  }}
                >
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td
                  style={{
                    border: '1px solid black',
                    textAlign: 'center',
                  }}
                >
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td
                  style={{
                    border: '1px solid black',
                    textAlign: 'center',
                  }}
                >
                  <LinkContainer to={`/order/${order._id}/edit`}>
                    <Button
                      variant='light'
                      className='btn-sm editDeleteButtons'
                    >
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen
