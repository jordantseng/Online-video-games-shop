import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Loader from '../components/Loader';
import Message from '../components/Message';
import { fetchEvents, createEvent, deleteEvent } from '../actions/events';

const EventList = ({ history }) => {
  const dispatch = useDispatch();
  const { loading, data: events, error } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user && !user.isAdmin) {
      history.replace('/login');
    }

    if (!events) {
      dispatch(fetchEvents());
    }
  }, [dispatch, history, user, events]);

  const onDeleteClick = (id) => {
    dispatch(deleteEvent(id));
  };

  const onCreateClick = () => {
    dispatch(createEvent());
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error && <Message variant='danger'>{error}</Message>}
          {events && (
            <>
              <Row className='align-items-center'>
                <Col>
                  <h1>Events</h1>
                </Col>
                <Col className='text-right'>
                  <Button className='my-3' onClick={onCreateClick}>
                    <i className='fas fa-plus'></i> Create Event
                  </Button>
                </Col>
              </Row>
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>REDIRECT URL</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event._id}>
                      <td>{event._id}</td>
                      <td>{event.redirectUrl}</td>
                      <td>
                        <Link to={`/admin/eventList/${event._id}/edit`}>
                          <Button variant='light' className='mr-2 btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </Link>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => onDeleteClick(event._id)}>
                          <i className='fas fa-trash'></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </>
      )}
    </>
  );
};

export default EventList;
