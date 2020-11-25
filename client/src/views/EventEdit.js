import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchEvent, updateEvent } from '../actions/event';
import Loader from '../components/Loader';
import Message from '../components/Message';

const EventEdit = ({ match }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');
  const [eventImg, setEventImg] = useState('');
  const dispatch = useDispatch();
  const { loading, data: event, error } = useSelector((state) => state.event);

  const eventId = match.params.id;
  const previewImage = useRef();

  useEffect(() => {
    if (!event || event._id !== eventId) {
      dispatch(fetchEvent(eventId));
    } else {
      setTitle(event.title);
      setDescription(event.description);
      setRedirectUrl(event.redirectUrl);
      setEventImg(event.image);
    }
  }, [dispatch, event, eventId]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateEvent(eventId, { title, description, redirectUrl, eventImg })
    );
  };

  const onUploadFile = (e) => {
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
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>RedirectUrl</Form.Label>
                <Form.Control
                  value={redirectUrl}
                  onChange={(e) => setRedirectUrl(e.target.value)}
                />
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
                  onChange={onUploadFile}></Form.File>
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
