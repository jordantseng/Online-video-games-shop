import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import { logout } from '../actions/auth';
import SearchBox from '../components/SearchBox';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand to='/' as={Link}>
            Video Game eShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='navbarColor01'>
            <Nav>
              <Nav.Link to='/products' as={NavLink} exact>
                All Products
              </Nav.Link>
              <Nav.Link to='/products/category/switch' as={NavLink}>
                Switch
              </Nav.Link>
              <Nav.Link to='/products/category/ps4' as={NavLink}>
                PS4
              </Nav.Link>
              <Nav.Link to='/products/category/ps5' as={NavLink}>
                PS5
              </Nav.Link>
              <Nav.Link to='/cart' as={NavLink}>
                Cart
              </Nav.Link>
              {user ? (
                <NavDropdown title={user.name} id='username'>
                  <NavDropdown.Item to='/profile' as={Link}>
                    Profile
                  </NavDropdown.Item>
                  {user.isAdmin && (
                    <>
                      <NavDropdown.Item to='/admin/eventList' as={Link}>
                        Events
                      </NavDropdown.Item>
                      <NavDropdown.Item to='/admin/userList' as={Link}>
                        Users
                      </NavDropdown.Item>
                      <NavDropdown.Item to='/admin/productList' as={Link}>
                        Products
                      </NavDropdown.Item>
                      <NavDropdown.Item to='/admin/orderList' as={Link}>
                        Orders
                      </NavDropdown.Item>
                    </>
                  )}
                  <NavDropdown.Item onClick={onLogoutClick}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link to='/login' as={Link}>
                  <i className='fas fa-user'>Login</i>
                </Nav.Link>
              )}
            </Nav>
            <Nav className='ml-auto'>
              <SearchBox />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
