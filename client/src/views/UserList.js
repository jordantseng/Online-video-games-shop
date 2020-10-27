import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { fetchUsers, deleteUser } from '../actions/userList';

import Message from '../components/Message';
import Loader from '../components/Loader';

const UserList = ({ history }) => {
  const dispatch = useDispatch();
  const { users, error } = useSelector((state) => state.userList);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      history.push('/login');
    } else {
      dispatch(fetchUsers());
    }
  }, [dispatch, history, user]);

  const onDeleteClick = (userId) => {
    dispatch(deleteUser(userId));
  };

  return (
    <>
      <h1>Users</h1>
      {users.length === 0 && !error ? (
        <Loader />
      ) : (
        <>
          {error ? <Message variant="danger">{error}</Message> : null}
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`emailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: 'green' }}></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <Link to={`/admin/users/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => onDeleteClick(user._id)}>
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default UserList;
