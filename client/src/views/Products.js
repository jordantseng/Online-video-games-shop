import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { fetchProducts } from '../actions/products';

import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';
import Paginate from '../components/Paginate';

const AllProducts = ({ match, location }) => {
  const dispatch = useDispatch();
  const { loading, data: products, page, error } = useSelector(
    (state) => state.products
  );

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const category = location.search.split('=')[1];

  useEffect(() => {
    dispatch(fetchProducts(keyword, category, pageNumber));
  }, [dispatch, keyword, category, pageNumber]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={page.total}
            page={page.current}
            keyword={keyword}
            path='/products'
          />
        </>
      )}
    </div>
  );
};

export default AllProducts;
