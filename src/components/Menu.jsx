import React, { useCallback, useEffect, useRef } from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import icon from '../images/cryptocurrency.png';

function Menu() {
  const scrollingRef = useRef();
  const handleScrolEffect = useCallback(() => {
    const containerMenu = scrollingRef.current;

    if (window.scrollY > 10) {
      containerMenu.classList.add('folded');
    } else {
      containerMenu.classList.remove('folded');
    }
  }, []);
  useEffect(() => {
    document.addEventListener('scroll', handleScrolEffect);

    return document.removeEventListener('scrol', handleScrolEffect);
  }, [handleScrolEffect]);

  return (
    <div className='nav-container' ref={scrollingRef}>
      <Navbar collapseOnSelect expand='lg' variant='dark'>
        <LinkContainer to='/crypto-app'>
          <Navbar.Brand className='logo'>
            <Image src={icon} className='logo-icon' />
            CryptoApp
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav fill>
            <LinkContainer to='/crypto-app'>
              <Nav.Link className='link '>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/crypto-app/cryptocurrencies'>
              <Nav.Link icon={icon} className='link'>
                Cryptocurrencies
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/crypto-app/exchanges'>
              <Nav.Link icon={icon} className='link'>
                Exchanges
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/crypto-app/news'>
              <Nav.Link className='link'>News</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Menu;
