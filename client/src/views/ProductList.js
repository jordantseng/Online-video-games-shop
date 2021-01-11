import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import axios from '../axios';
import {
  fetchProducts,
  deleteProduct,
  createProduct,
} from '../actions/products';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';

const ProductList = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, data: products, page, error } = useSelector(
    (state) => state.products
  );
  const pageNumber = match.params.pageNumber;

  useEffect(() => {
    const source = axios.CancelToken.source();
    dispatch(fetchProducts(undefined, undefined, pageNumber, source.token));

    return () => {
      source.cancel();
    };
  }, [dispatch, pageNumber]);

  const onDeleteClick = (id) => {
    dispatch(deleteProduct(id));
  };

  const onCreateClick = () => {
    dispatch(createProduct());
  };

  const renderProducts =
    !loading &&
    products.map((product) => (
      <tr key={product._id}>
        <td>
          <Link to={`/admin/products/${product._id}/edit`}>{product._id}</Link>
        </td>
        <td>{product.name}</td>
        <td>${product.price}</td>
        <td>{product.category}</td>
        <td>{product.brand}</td>
        <td>{product.releaseDate.split('T')[0]}</td>
        <td>
          <Link to={`/admin/products/${product._id}/edit`}>
            <Button variant='light' className='btn-sm'>
              <i className='fas fa-edit'></i>
            </Button>
          </Link>
          <Button
            variant='danger'
            className='btn-sm'
            onClick={() => onDeleteClick(product._id)}>
            <i className='fas fa-trash'></i>
          </Button>
        </td>
      </tr>
    ));

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row className='align-items-center'>
            <Col>
              <h1>Products</h1>
            </Col>
            <Col className='text-right'>
              <Button className='my-3' onClick={onCreateClick}>
                <i className='fas fa-plus'></i> Create Product
              </Button>
            </Col>
          </Row>
          {error && <Message variant='danger'>{error}</Message>}
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>RELEASE DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>{renderProducts}</tbody>
          </Table>
          <Paginate
            isAdmin={true}
            path='/admin/productList'
            page={page.current}
            pages={page.total}
          />
        </>
      )}
    </>
  );
};

export default ProductList;
