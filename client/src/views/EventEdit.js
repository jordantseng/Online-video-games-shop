import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';

import axios from '../axios';
import { fetchEvent, updateEvent } from '../actions/event';
import { eventFormValidationSchema } from '../validations';

import Loader from '../components/Loader';
import Message from '../components/Message';
import Input from '../components/Input';
import ImageInput from '../components/ImageInput';
import FormContainer from '../components/FormContainer';

const initialValues = {
  redirectUrl: '',
};

const EventEdit = ({ match }) => {
  const [eventFormValues, setEventFormValues] = useState(null);

  const dispatch = useDispatch();
  const { loading, data: event, error } = useSelector((state) => state.event);

  const eventId = match.params.id;

  useEffect(() => {
    const source = axios.CancelToken.source();

    if (!event || event._id !== eventId) {
      dispatch(fetchEvent(eventId, source.token));
    } else {
      setEventFormValues({ redirectUrl: event.redirectUrl });
    }

    return () => {
      source.cancel();
    };
  }, [dispatch, event, eventId, setEventFormValues]);

  const onSubmit = (eventFormValues) => {
    dispatch(updateEvent(eventId, eventFormValues));
  };

  return (
    <>
      <Link to='/admin/eventList' className='btn btn-light my-3'>
        Go back
      </Link>
      <FormContainer>
        {loading ? (
          <Loader />
        ) : (
          <>
            <h1>Edit Event</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {event && (
              <Formik
                initialValues={eventFormValues || initialValues}
                validationSchema={eventFormValidationSchema}
                onSubmit={onSubmit}
                enableReinitialize>
                {({ isSubmitting }) => (
                  <Form>
                    <Input
                      label='Redirect url'
                      name='redirectUrl'
                      type='text'
                    />
                    <ImageInput
                      label='Image'
                      name='eventImg'
                      src={`/api/events/${eventId}/image`}
                    />
                    <Button
                      className='d-block ml-auto'
                      variant='primary'
                      type='submit'
                      disabled={isSubmitting}>
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
            )}
          </>
        )}
      </FormContainer>
    </>
  );
};

export default EventEdit;
