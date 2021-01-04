import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import axios from '../axios';
import { fetchProducts } from '../actions/products';

import CardLoader from '../components/CardLoader';
import Message from '../components/Message';
import ProductCards from '../components/ProductCards';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';

const Products = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, data: products, page, error } = useSelector(
    (state) => state.products
  );

  const pageNumber = match.params.pageNumber;
  const category = match.params.category;

  useEffect(() => {
    const source = axios.CancelToken.source();

    dispatch(fetchProducts(undefined, category, pageNumber, source.token));

    return () => {
      source.cancel();
    };
  }, [dispatch, category, pageNumber]);

  return (
    <>
      <Meta title={category || 'Products'} />
      {loading ? (
        <CardLoader count={12} />
      ) : (
        <>
          {error && <Message variant='danger'>{error}</Message>}
          <h1>{category ? category.toUpperCase() : 'All products'}</h1>
          <div>Total items: {page.totalItems}</div>
          <ProductCards products={products} />
          <Paginate pages={page.total} page={page.current} path='/products' />
        </>
      )}
    </>
  );
};
export default Products;
