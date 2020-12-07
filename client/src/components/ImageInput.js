import React, { useRef } from 'react';
import { Form, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { useField } from 'formik';

const ImageInput = ({ label, name, src }) => {
  const [, , helpers] = useField(name);

  const previewImage = useRef();

  const onSelectFile = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    helpers.setValue(file);

    if (file) {
      reader.onload = function (e) {
        previewImage.current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form.Group controlId={name}>
      <Form.Label>
        <div>{label}</div>
        <Image ref={previewImage} src={src} rounded fluid />
      </Form.Label>
      <Form.File
        id='image-file'
        label='Choose file'
        custom
        onChange={onSelectFile}
      />
    </Form.Group>
  );
};

ImageInput.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default ImageInput;
