import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Card.Body>
        <Link to={`/products/${product._id}`}>
          <div>
            <Card.Img
              src={`/api/products/${product._id}/image`}
              variant='top'
              style={{
                height: '180px',
                objectFit: 'contain',
              }}
            />
          </div>
          <Card.Title as='div'>
            <p
              style={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}>
              <strong>{product.name}</strong>
            </p>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating value={product.rating} />
        </Card.Text>
        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
