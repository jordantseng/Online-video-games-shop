import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from '../axios';
import { fetchOrders } from '../actions/orders';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import OrderTable from '../components/OrderTable';

const OrderList = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, data: orders, page, error } = useSelector(
    (state) => state.orders
  );
  const { data: user } = useSelector((state) => state.auth);
  const pageNumber = match.params.pageNumber;

  useEffect(() => {
    const source = axios.CancelToken.source();

    dispatch(fetchOrders(pageNumber, source.token));

    return () => {
      source.cancel();
    };
  }, [dispatch, pageNumber]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error && <Message variant='danger'>{error}</Message>}
          <h1>Orders</h1>
          <OrderTable orders={orders} user={user} />
          <Paginate
            isAdmin={true}
            path='/admin/orderList'
            page={page.current}
            pages={page.total}
          />
        </>
      )}
    </>
  );
};

export default OrderList;
