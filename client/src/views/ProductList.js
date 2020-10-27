import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import {
  fetchProducts,
  createProduct,
  deleteProduct,
} from '../actions/productList';
import Message from '../components/Message';
import Loader from '../components/Loader';

const ProductList = ({ history }) => {
  const dispatch = useDispatch();
  const { error, products } = useSelector((state) => state.productList);

  const { user } = useSelector((state) => state.auth);

  const onDeleteClick = (id) => {
    dispatch(deleteProduct(id));
  };

  const onCreateClick = () => {
    dispatch(createProduct());
  };

  useEffect(() => {
    if (!user || !user.isAdmin) {
      history.push('/login');
    } else {
      dispatch(fetchProducts());
    }
  }, [dispatch, history, user]);

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
      {products.length === 0 && !error ? (
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
