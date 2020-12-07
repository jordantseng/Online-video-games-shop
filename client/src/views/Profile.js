import React, { useEffect } from 'react';
import { Row, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Router, Route, Switch, NavLink } from 'react-router-dom';

import UserProfile from '../components/UserProfile';
import UserOrders from '../components/UserOrders';

const Profile = ({ history }) => {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [history, user]);

  return (
    <>
      <Row>
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
        </Nav>
      </Row>
      <Row>
        <Router history={history}>
          <Switch>
            <Route
              path='/profile/orders/page/:pageNumber'
              component={UserOrders}
            />
            <Route path='/profile/orders' component={UserOrders} />
            <UserProfile />
          </Switch>
        </Router>
      </Row>
    </>
  );
};

export default Profile;
