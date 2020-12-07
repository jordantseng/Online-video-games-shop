import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchProducts } from '../actions/products';

import CardLoader from '../components/CardLoader';
import Message from '../components/Message';
import ProductCards from '../components/ProductCards';
import Paginate from '../components/Paginate';

const SearchResults = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, data: products, page, error } = useSelector(
    (state) => state.products
  );
  const pageNumber = match.params.pageNumber || 1;
  const keyword = match.params.keyword;

  useEffect(() => {
    dispatch(fetchProducts(keyword, undefined, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <div>
      {loading ? (
        <CardLoader count={12} />
      ) : (
        <>
          {error && <Message variant='danger'>{error}</Message>}
          <h1>Search Results</h1>
          <div>Total items: {page.totalItems}</div>
          <ProductCards products={products} />
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

export default SearchResults;
