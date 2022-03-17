import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  Spinner,
  Form,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import millify from 'millify';
import { useGetCryptosQuery } from '../services/cryptoApi';

function Cryptocurencies({ simplified }) {
  const numOfCrypto = simplified ? 10 : 100;

  const { data: coins, isFetching } = useGetCryptosQuery(numOfCrypto);
  const [cryptos, setCryptos] = useState([]);
  const [searchCrypto, setSearchCrypto] = useState('');

  useEffect(() => {
    const filteredData = coins?.data?.coins.filter((coin) =>
      coin.name
        .concat(coin.symbol)
        .toLowerCase()
        .includes(searchCrypto.toLowerCase())
    );
    setCryptos(filteredData);
  }, [coins, searchCrypto]);

  if (isFetching)
    return <Spinner animation='border' className='spinner-loading' />;

  return (
    <div
      className='crypto-container'
      style={simplified && { marginTop: '0px' }}
    >
      {!simplified && (
        <div className='search-container'>
          <Form className='search-input'>
            <Form.Control
              placeholder='Search Crypto...'
              onChange={(e) => setSearchCrypto(e.target.value)}
            ></Form.Control>
          </Form>
        </div>
      )}
      <Row className='no-gutters'>
        {cryptos?.map((coin) => {
          return (
            <Col md={6} lg={4} sm={6} xl={3} key={coin.uuid}>
              <Link
                to={`/crypto-app/crypto/${coin.uuid}`}
                className='card-link'
              >
                <Card className='card-crypto  p-3  rounded'>
                  <div className='card-heading'>
                    <Card.Title className='card-title'>
                      {coin.name} ({coin.symbol})
                    </Card.Title>
                    <Card.Img
                      className='card-img'
                      src={`${coin.iconUrl}`}
                    ></Card.Img>
                  </div>
                  <Card.Body>
                    <ListGroup>
                      <ListGroupItem className='card-value'>
                        Price:{' '}
                        <span className='card-values'>
                          ${' '}
                          {coin.price <= 1
                            ? millify(coin.price, {
                                precision: 5,
                              })
                            : millify(coin.price)}{' '}
                        </span>
                      </ListGroupItem>
                      <ListGroupItem>
                        Market Cap:{' '}
                        <span className='card-values'>
                          $ {millify(coin.marketCap)}
                        </span>
                      </ListGroupItem>
                      <ListGroupItem>
                        Daily change:{' '}
                        <span
                          className={
                            coin.change < 0
                              ? 'daily-change red'
                              : 'daily-change'
                          }
                        >
                          {coin.change}%
                        </span>
                      </ListGroupItem>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Cryptocurencies;
