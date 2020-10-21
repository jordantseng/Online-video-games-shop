import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { fetchProductList, deleteProduct, createProduct } from '../actions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { PRODUCT_CREATE_RESET } from '../actions/types';

const ProductList = ({ history, match }) => {
  const dispatch = useDispatch();
  const { loading, error, products, product } = useSelector(
    (state) => state.productList
  );

  const { user } = useSelector((state) => state.userInfo);

  const onDeleteClick = (id) => {
    dispatch(deleteProduct(id));
  };

  const onCreateClick = () => {
    dispatch(createProduct());
  };

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!user.isAdmin) {
      history.push('/login');
    }

    if (product) {
      history.push(`/admin/products/${product._id}/edit`);
    } else {
      dispatch(fetchProductList());
    }
  }, [dispatch, history, user, product]);

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={onCreateClick}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <Link to={`/admin/products/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => onDeleteClick(product._id)}>
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductList;
