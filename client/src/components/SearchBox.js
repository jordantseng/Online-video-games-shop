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
    <Form className='mb-2' onSubmit={onSearchClick} inline>
      <Form.Control
        className='flex-grow-1'
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
      />
      <Button type='submit' variant='secondary' size='sm'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
