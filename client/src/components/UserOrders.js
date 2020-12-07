import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchMyOrders } from '../actions/myOrders';

import Paginate from './Paginate';
import OrderTable from './OrderTable';
import Loader from './Loader';
import Message from './Message';

const UserOrders = ({ location }) => {
  const dispatch = useDispatch();
  const {
    loading: loadingMyOrders,
    data: myOrders,
    page,
    error: errorOrders,
  } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.auth);

  const pageNumber = location.pathname.split('page/')[1] || 1;

  useEffect(() => {
    dispatch(fetchMyOrders(pageNumber));
  }, [dispatch, pageNumber]);

  return (
    <>
      {loadingMyOrders ? (
        <Loader />
      ) : (
        <>
          {errorOrders && <Message variant='danger'>{errorOrders}</Message>}
          <h1>My orders</h1>
          <OrderTable orders={myOrders} user={user} inProfilePage={true} />
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
