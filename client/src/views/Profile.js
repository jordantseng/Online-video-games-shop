import React from 'react';
import { Row, Nav } from 'react-bootstrap';
import { Router, Route, Switch, NavLink } from 'react-router-dom';

import UserProfile from '../components/UserProfile';
import UserOrders from '../components/UserOrders';
import WishList from './WishList';

const Profile = ({ history }) => {
  return (
    <>
      <Row className='mb-3'>
        <Nav variant='tabs'>
          <Nav.Item>
            <Nav.Link to='/profile' as={NavLink} exact>
              Profile
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link to='/profile/orders' as={NavLink}>
              Orders
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link to='/profile/wishlist' as={NavLink}>
              Wish
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Row>

      <Router history={history}>
        <Switch>
          <Route
            path='/profile/orders/page/:pageNumber'
            component={UserOrders}
          />
          <Route path='/profile/orders' component={UserOrders} />
          <Route path='/profile/wishlist' component={WishList} />
          <UserProfile />
        </Switch>
      </Router>
    </>
  );
};

export default Profile;
