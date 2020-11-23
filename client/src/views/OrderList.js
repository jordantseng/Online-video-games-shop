import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchOrders } from '../actions/orders';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import OrderTable from '../components/OrderTable';

const OrderList = ({ history, match }) => {
  const dispatch = useDispatch();
  const { loading, data: orders, page, error } = useSelector(
    (state) => state.orders
  );
  const { user } = useSelector((state) => state.auth);
  const pageNumber = match.params.pageNumber || 1;

  useEffect(() => {
    if (!user || !user.isAdmin) {
      history.replace('/login');
    } else {
      dispatch(fetchOrders(pageNumber));
    }
  }, [dispatch, history, user, pageNumber]);

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error && <Message variant="danger">{error}</Message>}
          <OrderTable orders={orders} user={user} />
          <Paginate
            isAdmin={true}
            path="/admin/orderList"
            page={page.current}
            pages={page.total}
          />
        </>
      )}
    </>
  );
};

export default OrderList;
