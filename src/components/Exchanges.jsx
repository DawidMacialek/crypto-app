import React from 'react';
import { useGetCryptoExchangeQuery } from '../services/cryptoExchangeApi';
import { Spinner, Col, Form, Row, ListGroup } from 'react-bootstrap';
import millify from 'millify';
import { FiLink } from 'react-icons/fi';

function Exchanges() {
  const { data, isFetching } = useGetCryptoExchangeQuery();
  const exchangesList = data;
  if (isFetching)
    return <Spinner animation='border' className='spinner-loading' />;
  console.log(data);

  return (
    <div className='exchange-container'>
      <ListGroup as='ol'>
        <ListGroup.Item disabled className='exchange-list'>
          <Row xs={4}>
            <Col>Exchange</Col>
            <Col className='exchange-values'>24h BTC Trade Volume</Col>
            <Col className='exchange-values'>Trust score rank</Col>
            <Col className='link-title'>Link</Col>
          </Row>
        </ListGroup.Item>
        {exchangesList.map((exchange) => {
          const {
            id,
            name,
            image,
            trade_volume_24h_btc,
            url,
            trust_score_rank,
          } = exchange;
          return (
            <ListGroup.Item as='li' action key={id} className='exchange-list'>
              <Row xs={4}>
                <Col>
                  <span>
                    <img src={image} alt={name} className='exchange-img' />
                    {name}
                  </span>
                </Col>
                <Col className='exchange-values'>
                  <span>$ {millify(trade_volume_24h_btc)}</span>
                </Col>
                <Col className='exchange-values'>
                  <span>{trust_score_rank}</span>
                </Col>
                <Col className='link-title'>
                  <a href={url} target='_blank' rel='noreferrer'>
                    <FiLink />
                  </a>
                </Col>
              </Row>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}

export default Exchanges;
