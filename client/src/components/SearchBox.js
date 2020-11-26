import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import history from '../history';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');

  const onSearchClick = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form onSubmit={onSearchClick} inline style={{ marginBottom: '1rem' }}>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        style={{ flex: 1 }}></Form.Control>
      <Button type='submit' variant='secondary' className='ml-2'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
