import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import Product from '../components/Product';
import Message from '../components/Message';
import { HeartFill } from 'react-bootstrap-icons';
import { deleteWishProduct } from '../actions/auth';

const WishList = () => {
  const { data: user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onRemoveProduct = (productId) => {
    dispatch(deleteWishProduct(productId));
  };

  const renderLikeIcon = (productId) => {
    return (
      <HeartFill
        style={{
          position: 'absolute',
          right: '2rem',
          top: '2rem',
          zIndex: 100,
          color: 'red',
          cursor: 'pointer',
        }}
        onClick={() => onRemoveProduct(productId)}
      />
    );
  };

  return (
    <>
      <h1>Wish List</h1>

      <Row>
        {user.wishList.length === 0 ? (
          <Message>You don't have any order yet.</Message>
        ) : (
          user.wishList.map((wish) => (
            <Col
              key={wish._id}
              sm={12}
              md={6}
              lg={4}
              xl={3}
              style={{ position: 'relatvie' }}>
              {renderLikeIcon(wish._id)}
              <Product product={wish} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
};

export default WishList;
