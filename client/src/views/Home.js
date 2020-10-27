import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProducts } from '../actions/productList';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';

const Home = () => {
  const dispatch = useDispatch();
  const { products, error } = useSelector((state) => state.productList);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {products.length === 0 && !error ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Home;
