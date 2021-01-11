import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import axios from '../axios';
import { fetchUsers, deleteUser } from '../actions/users';

import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';

const UserList = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, data: users, page, error } = useSelector(
    (state) => state.users
  );

  const pageNumber = match.params.pageNumber;

  useEffect(() => {
    const source = axios.CancelToken.source();

    dispatch(fetchUsers(pageNumber, source.token));

    return () => {
      source.cancel();
    };
  }, [dispatch, pageNumber]);

  const renderUsersTable =
    !loading &&
    users.map((user) => (
      <tr key={user._id}>
        <td>
          <Link to={`/admin/users/${user._id}/edit`}>{user._id}</Link>
        </td>
        <td>{user.name}</td>
        <td>
          <a href={`emailto:${user.email}`}>{user.email}</a>
        </td>
        <td>
          {user.isAdmin ? (
            <i className='fas fa-check' style={{ color: 'green' }}></i>
          ) : (
            <i className='fas fa-times' style={{ color: 'red' }}></i>
          )}
        </td>
        <td>
          <Link to={`/admin/users/${user._id}/edit`}>
            <Button variant='light' className='btn-sm'>
              <i className='fas fa-edit'></i>
            </Button>
          </Link>
          <Button
            variant='danger'
            className='btn-sm'
            onClick={() => dispatch(deleteUser(user._id))}>
            <i className='fas fa-trash'></i>
          </Button>
        </td>
      </tr>
    ));

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error && <Message variant='danger'>{error}</Message>}
          <h1>Users</h1>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>{renderUsersTable}</tbody>
          </Table>

          <Paginate
            isAdmin={true}
            path='/admin/userList'
            pages={page.total}
            page={page.current}
          />
        </>
      )}
    </>
  );
};

export default UserList;
