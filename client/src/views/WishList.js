import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import Product from '../components/Product';
import { HeartFill } from 'react-bootstrap-icons';
import { updateWishList } from '../actions/auth';

const WishList = () => {
  const { data: user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onRemoveProduct = (productId) => {
    dispatch(updateWishList(productId));
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
    <Row>
      {user.wishList.map((wish) => {
        return (
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
        );
      })}
    </Row>
  );
};

export default WishList;
