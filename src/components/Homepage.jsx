import React from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import millify from 'millify';
import { useGetCryptosQuery } from '../services/cryptoApi';

import { Cryptocurrencies, News } from './index.js';

function Homepage() {
  const { data, isFetching } = useGetCryptosQuery(10);

  const globalStats = data?.data?.stats;

  if (isFetching)
    return <Spinner animation='border' className='spinner-loading' />;

  return (
    <div className='homepage-container'>
      <h2>Global Crypto Stats</h2>

      <Row
        xs={1}
        md={2}
        className='g-4 m-3 no-gutters homepage-stats-container'
      >
        <Col>
          <Card className='card-homepage'>
            <Card.Body>
              <Card.Title className='stats-title'>
                Total Cryptocurrencies
              </Card.Title>
              <Card.Text className='stats-value'>
                {millify(globalStats.total)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className='card-homepage'>
            <Card.Body>
              <Card.Title className='stats-title'>Total Exchanges</Card.Title>
              <Card.Text className='stats-value'>
                {globalStats.totalExchanges}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className='card-homepage'>
            <Card.Body>
              <Card.Title className='stats-title'>Total Market Cup</Card.Title>
              <Card.Text className='stats-value'>
                {millify(globalStats.totalMarketCap)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className='card-homepage'>
            <Card.Body>
              <Card.Title className='stats-title'>24h Volume</Card.Title>
              <Card.Text className='stats-value'>
                {millify(globalStats.total24hVolume)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className='card-homepage'>
            <Card.Body>
              <Card.Title className='stats-title'>Total Markets</Card.Title>
              <Card.Text className='stats-value'>
                {millify(globalStats.totalMarkets)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className='heading-crypto'>
        <h3>Top 10 Cryptocurrencies in the world</h3>
        <h3>
          <Link className='show-more-btn' to='/crypto-app/cryptocurrencies'>
            Show more
          </Link>
        </h3>
      </div>
      <Cryptocurrencies simplified />
      <div className='heading-crypto'>
        <h3>Latest Crypto News</h3>
        <h3>
          <Link className='show-more-btn' to='/crypto-app/news'>
            Show more
          </Link>
        </h3>
      </div>
      <News simplified />
    </div>
  );
}

export default Homepage;
