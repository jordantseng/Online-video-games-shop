import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import axios from '../axios';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { fetchEvents, createEvent, deleteEvent } from '../actions/events';

const EventList = () => {
  const dispatch = useDispatch();
  const { loading, data: events, error } = useSelector((state) => state.events);

  useEffect(() => {
    const source = axios.CancelToken.source();

    if (!events) {
      dispatch(fetchEvents(source.token));
    }

    return () => {
      source.cancel();
    };
  }, [dispatch, events]);

  const onDeleteClick = (id) => dispatch(deleteEvent(id));
  const onCreateClick = () => dispatch(createEvent());

  const renderEvents =
    !loading &&
    events.map((event) => (
      <tr key={event._id}>
        <td>
          <Link to={`/admin/eventList/${event._id}/edit`}>{event._id}</Link>
        </td>
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
    ));

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error && <Message variant='danger'>{error}</Message>}
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
            <tbody>{renderEvents}</tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default EventList;
