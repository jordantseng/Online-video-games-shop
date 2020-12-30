import React from 'react';
import { useField, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';

import { Form, FormControl } from 'react-bootstrap';

const BootstrapInput = (props) => <Form.Control {...props} />;

const BootstrapTextArea = (props) => (
  <Form.Control as='textarea' row='5' {...props} />
);

const BootstrapSelect = (props) => {
  return (
    <Form.Control as='select' {...props}>
      {props.options.map((option) => (
        <option key={option.title} value={option.value}>
          {option.title}
        </option>
      ))}
    </Form.Control>
  );
};

const BootstrapDate = (props) => <Form.Control type='date' {...props} />;

const BootstrapCheckbox = (props) => <Form.Check {...props} />;

const BootstrapRadio = (props) => <Form.Check {...props} />;

const Input = ({ name, type, label, disabled, options, value }) => {
  const [, meta] = useField(name);

  const renderInput = (type) => {
    switch (type) {
      case 'select':
        return BootstrapSelect;

      case 'textarea':
        return BootstrapTextArea;

      case 'date':
        return BootstrapDate;

      case 'checkbox':
        return BootstrapCheckbox;

      case 'radio':
        return BootstrapRadio;

      default:
        return BootstrapInput;
    }
  };

  return (
    <Form.Group controlId={label}>
      {type === 'checkbox' || type === 'radio' ? (
        <Field
          name={name}
          type={type}
          label={label}
          value={value}
          as={renderInput(type)}
        />
      ) : (
        <>
          <Form.Label>{label}</Form.Label>
          <Field
            name={name}
            type={type}
            placeholder={`Enter ${label}`}
            isInvalid={meta.touched && meta.error}
            disabled={disabled}
            options={options}
            as={renderInput(type)}
          />
          <ErrorMessage
            name={name}
            render={(msg) => (
              <FormControl.Feedback type='invalid'>{msg}</FormControl.Feedback>
            )}
          />
        </>
      )}
    </Form.Group>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Input;
