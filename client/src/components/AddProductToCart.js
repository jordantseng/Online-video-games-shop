import React, { useState } from 'react';
import { Row, Col, ListGroup, Card, Form, Button } from 'react-bootstrap';
import history from '../history';

const AddProductToCart = ({ product }) => {
  const [qty, setQty] = useState(1);

  const onAddToCartClick = () => {
    // store the product id and qty in url
    history.push(`/cart/${product._id}?qty=${qty}`);
  };

  return (
    <Card>
      <ListGroup varient='flush'>
        <ListGroup.Item>
          <Row>
            <Col>Price:</Col>
            <Col>
              <strong>${product.price}</strong>
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Status:</Col>
            <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
          </Row>
        </ListGroup.Item>

        {product.countInStock > 0 && (
          <ListGroup.Item>
            <Row>
              <Col>Qty</Col>
              <Col>
                <Form.Control
                  as='select'
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}>
                  {[...Array(product.countInStock).keys()].map((index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Row>
          </ListGroup.Item>
        )}
        <ListGroup.Item>
          <Button
            className='btn-block'
            type='button'
            disabled={product.countInStock < 1}
            onClick={onAddToCartClick}>
            Add To Cart
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default AddProductToCart;
