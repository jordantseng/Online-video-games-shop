import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      className='d-block m-auto'
      style={{
        width: '100px',
        height: '100px',
      }}>
      <span className='sr-only'>Loading...</span>
    </Spinner>
  );
};

export default Loader;
