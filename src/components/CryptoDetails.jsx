import React, { useState } from 'react';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import {
  AiOutlineDollarCircle,
  AiOutlineNumber,
  AiOutlineThunderbolt,
  AiOutlineTrophy,
  AiOutlineFund,
  AiOutlineMoneyCollect,
  AiOutlineCheck,
  AiOutlineStop,
  AiOutlineExclamationCircle,
} from 'react-icons/ai';
import { Spinner, Col, Form, Row, ListGroup } from 'react-bootstrap';
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from '../services/cryptoApi';
import CryptodetailsChart from './CryptoDetailsChart';

function CryptoDetails() {
  const [timeperiod, setTimeperiod] = useState('7d');
  const { coinId } = useParams();
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timeperiod,
  });

  if (isFetching)
    return <Spinner animation='border' className='spinner-loading' />;

  const cryptoDetails = data?.data?.coin;

  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <AiOutlineDollarCircle />,
    },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <AiOutlineNumber /> },
    {
      title: '24h Volume',
      value: `$ ${
        cryptoDetails['24hVolume'] && millify(cryptoDetails['24hVolume'])
      }`,
      icon: <AiOutlineThunderbolt />,
    },
    {
      title: 'Market Cap',
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <AiOutlineDollarCircle />,
    },
    {
      title: 'All-time-high(daily avg.)',
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <AiOutlineTrophy />,
    },
  ];
  const otherStats = [
    {
      title: 'Number Of Markets',
      value: cryptoDetails?.numberOfMarkets,
      icon: <AiOutlineFund />,
    },
    {
      title: 'Number Of Exchanges',
      value: cryptoDetails?.numberOfExchanges,
      icon: <AiOutlineMoneyCollect />,
    },
    {
      title: 'Aprroved Supply',
      value: cryptoDetails?.supply?.confirmed ? (
        <AiOutlineCheck />
      ) : (
        <AiOutlineStop />
      ),
      icon: <AiOutlineExclamationCircle />,
    },
    {
      title: 'Total Supply',
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <AiOutlineExclamationCircle />,
    },
    {
      title: 'Circulating Supply',
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <AiOutlineExclamationCircle />,
    },
  ];
  const timePeriodToChoose = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  return (
    <div className='cryptoDetails-container'>
      <Col className='cryptoDetails-heading'>
        <h1>
          {cryptoDetails.name}({cryptoDetails.symbol})
        </h1>
        <p>
          {cryptoDetails.name} live price in US Dollar (USD). View value
          statistics, market cap and supply.
        </p>
      </Col>
      <hr />
      <Row className='basic-info-stats'>
        <Col sm='auto'>
          <h5>
            <span className='basic-stats-label'>
              Current {cryptoDetails.name} Price:{' '}
            </span>{' '}
            $
            {cryptoDetails.price > 1
              ? (cryptoDetails.price * 1).toFixed(2)
              : (cryptoDetails.price * 1).toFixed(5)}
          </h5>

          <h5>
            <span className='basic-stats-label'>Change:</span>{' '}
            <span
              className={
                coinHistory?.data?.change < 0
                  ? 'daily-change red'
                  : 'daily-change'
              }
            >
              {coinHistory?.data?.change === null
                ? 'no data'
                : `${coinHistory?.data?.change} %`}
            </span>
          </h5>
        </Col>
        <Col sm='auto'>
          <Form.Select
            className='timeperiod-coindetails-input'
            aria-label='Set time period'
            onChange={(e) => setTimeperiod(e.target.value)}
            value={timeperiod}
          >
            {timePeriodToChoose.map((date, i) => {
              return <option key={i}>{date}</option>;
            })}
          </Form.Select>
        </Col>
      </Row>

      <CryptodetailsChart coinHistory={coinHistory} />
      <hr />
      <Row md={2} xs={1} className='stats-coinDetails-cointainer'>
        <Col>
          <div className='stats-coinDetails-label'>
            <h3>{cryptoDetails.name} Value Statistics</h3>
            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </div>
          <ListGroup variant='flush'>
            {stats.map((stat, i) => {
              return (
                <ListGroup.Item key={i} className='list-group-container'>
                  <span>
                    {stat.icon} {stat.title}
                  </span>
                  <span className='list-group-stats-value'>{stat.value}</span>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
        <Col>
          <div className='stats-coinDetails-label'>
            <h3>Other Stats Info</h3>
            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </div>
          <ListGroup variant='flush'>
            {otherStats.map((stat, i) => {
              return (
                <ListGroup.Item key={i} className='list-group-container'>
                  <span>
                    {stat.icon} {stat.title}
                  </span>
                  <span className='list-group-stats-value'>{stat.value}</span>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
      </Row>
      <Row md={2} xs={1} className='coin-descreption-container'>
        <Col>
          <h3>What is {cryptoDetails.name}?</h3>
          {HTMLReactParser(
            cryptoDetails.description
              ? cryptoDetails.description
              : 'sorry, there is no data to show'
          )}
        </Col>
        <Col>
          <h3>{cryptoDetails.name} Links</h3>
          <ListGroup variant='flush'>
            {cryptoDetails?.links?.map((link, i) => {
              return (
                <ListGroup.Item key={i} className='list-group-container'>
                  <span>{link.type}</span>
                  <a href={link.url} target='_blank' rel='noreferrer'>
                    {link.name}
                  </a>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}

export default CryptoDetails;
