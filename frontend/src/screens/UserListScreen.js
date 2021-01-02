import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, successDelete, userInfo])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <>
      <h1 className='text-primary'>Users</h1>
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
            fontSize: '1.25rem',
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
                NAME
              </th>
              <th
                style={{
                  border: '1px solid black',
                  fontWeight: 'bold',
                  fontSize: '1.25rem',
                }}
              >
                EMAIL
              </th>
              <th
                style={{
                  border: '1px solid black',
                  fontWeight: 'bold',
                  fontSize: '1.25rem',
                }}
              >
                ADMIN
              </th>
              <th
                style={{
                  border: '1px solid black',
                  fontWeight: 'bold',
                  fontSize: '1.25rem',
                }}
              >
                EDIT/DELETE
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td style={{ border: '1px solid black' }}>{user._id}</td>
                <td style={{ border: '1px solid black' }}>{user.name}</td>
                <td style={{ border: '1px solid black' }}>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td
                  style={{
                    border: '1px solid black',
                    textAlign: 'center',
                  }}
                >
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
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
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button
                      variant='light'
                      className='btn-sm editDeleteButtons'
                    >
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm editDeleteButtons'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
