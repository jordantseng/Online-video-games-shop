import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Route } from 'react-router-dom';

import { logout } from '../actions/auth';
import SearchBox from './SearchBox';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand to="/" as={Link}>
            proShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={(props) => <SearchBox {...props} />} />
            <Nav className="ml-auto">
              <Nav.Link to="/cart" as={NavLink}>
                <i className="fas fa-shopping-cart"></i>Cart
              </Nav.Link>
              {user ? (
                <NavDropdown title={user.name} id="username">
                  <NavDropdown.Item to="/profile" as={Link}>
                    Profile
                  </NavDropdown.Item>

                  {user.isAdmin && (
                    <>
                      <NavDropdown.Item to="/admin/userList" as={Link}>
                        Users
                      </NavDropdown.Item>
                      <NavDropdown.Item to="/admin/productList" as={Link}>
                        Products
                      </NavDropdown.Item>
                      <NavDropdown.Item to="/admin/orderList" as={Link}>
                        Orders
                      </NavDropdown.Item>
                    </>
                  )}
                  <NavDropdown.Item onClick={onLogoutClick}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link to="/login" as={Link}>
                  <i className="fas fa-user">Sign In</i>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
