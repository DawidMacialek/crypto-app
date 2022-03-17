import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { AiOutlineCopyright } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer>
      <Row className='footer-container'>
        <Col className='footer-links'>
          <Link className='footer-link' to='/crypto-app'>
            Home
          </Link>
          <Link className='footer-link' to='/crypto-app/cryptocurrencies'>
            Cryptocurrencies
          </Link>
          <Link className='footer-link' to='/crypto-app/exchanges'>
            Exchanges
          </Link>
          <Link className='footer-link' to='/crypto-app/news'>
            News
          </Link>
        </Col>
        <Col className='footer-stamp'>
          <AiOutlineCopyright />
          <span>DM CryptoApp</span>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
