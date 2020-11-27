import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchEvent, updateEvent } from '../actions/event';
import useInput from '../hooks/useInput';

import Loader from '../components/Loader';
import Message from '../components/Message';

const EventEdit = ({ match }) => {
  const [redirectUrl, setRedirectUrl, bindRedirectUrl] = useInput('');
  const [eventImg, setEventImg] = useState(null);
  const dispatch = useDispatch();
  const { loading, data: event, error } = useSelector((state) => state.event);

  const eventId = match.params.id;
  const previewImage = useRef();

  useEffect(() => {
    if (!event || event._id !== eventId) {
      dispatch(fetchEvent(eventId));
    } else {
      setRedirectUrl(event.redirectUrl);
      setEventImg(event.image);
    }
  }, [dispatch, event, eventId, setRedirectUrl, setEventImg]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(updateEvent(eventId, { redirectUrl, eventImg }));
  };

  const onSelectFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    setEventImg(file);

    if (file) {
      reader.onload = function (e) {
        previewImage.current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Link to='/admin/eventList' className='btn btn-light my-3'>
            Go back
          </Link>
          <h1>Edit Event</h1>
          {error && <Message variant='danger'>{error}</Message>}
          {!error && event && (
            <Form onSubmit={onSubmit}>
              <Form.Group>
                <Form.Label>RedirectUrl</Form.Label>
                <Form.Control {...bindRedirectUrl} />
              </Form.Group>

              <Form.Group controlId='image'>
                <Form.Label>
                  <div>Image</div>
                  <Image
                    ref={previewImage}
                    src={`/api/events/${eventId}/image`}
                    rounded
                    fluid
                  />
                </Form.Label>
                <Form.File
                  id='image-file'
                  label='Choose file'
                  custom
                  onChange={onSelectFile}></Form.File>
              </Form.Group>

              <Button variant='primary' type='submit'>
                Submit
              </Button>
            </Form>
          )}
        </>
      )}
    </>
  );
};

export default EventEdit;
