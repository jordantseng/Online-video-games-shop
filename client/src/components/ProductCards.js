import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Product from './Product';

const ProductCards = ({ products }) => {
  return (
    <>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ProductCards;
