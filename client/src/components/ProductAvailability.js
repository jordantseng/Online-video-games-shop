import React, { useState } from 'react';
import { Row, Col, ListGroup, Card, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import history from '../history';
import { updateWishProduct } from '../actions/auth';

const ProductAvailability = ({ product }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const { data: user } = useSelector((state) => state.auth);

  const onAddToCartClick = () => {
    // store the product id and qty in url
    history.push(`/cart/${product._id}?qty=${qty}`);
  };

  const onAddToWishListClick = () => {
    if (user) {
      dispatch(updateWishProduct(product._id));
      return;
    }

    history.push(
      `/login?redirect=products/${product._id}`
    );
  };

  const renderWishlistText =
    user && user.wishList.find((wish) => wish._id === product._id)
      ? 'Remove From Wishlist'
      : 'Add To Wishlist';

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
                  disabled={product.isPreOrder}
                  onChange={(e) => setQty(e.target.value)}>
                  {[...Array(product.countInStock).keys()].map((index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Row>
            {product.isPreOrder && <p>*Limit one item per person</p>}
          </ListGroup.Item>
        )}
        <ListGroup.Item>
          <Button
            className='btn-block'
            type='button'
            disabled={product.countInStock < 1}
            onClick={onAddToCartClick}>
            {!product.isPreOrder ? 'Add To Cart' : 'Pre-Order'}
          </Button>
          <Button
            className='btn-block'
            type='button'
            onClick={onAddToWishListClick}>
            {renderWishlistText}
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default ProductAvailability;
