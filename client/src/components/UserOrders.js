import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from '../axios';
import { fetchMyOrders } from '../actions/orders';

import Paginate from './Paginate';
import OrderTable from './OrderTable';
import Loader from './Loader';
import Message from './Message';

const UserOrders = ({ location }) => {
  const dispatch = useDispatch();
  const { loading, data: orders, page, error } = useSelector(
    (state) => state.orders
  );
  const { user } = useSelector((state) => state.auth);

  const pageNumber = location.pathname.split('page/')[1] || 1;

  useEffect(() => {
    const source = axios.CancelToken.source();

    dispatch(fetchMyOrders(pageNumber, source.token));

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
          <h1>My orders</h1>
          <OrderTable orders={orders} user={user} inProfilePage={true} />
          <Paginate
            path='/profile/orders'
            pages={page.total}
            page={page.current}
          />
        </>
      )}
    </>
  );
};

export default UserOrders;
