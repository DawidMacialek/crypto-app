import React, { useState } from 'react';
import { useGetCryptoNewsQuery } from '../services/cryptoNews';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Row, Col, Card, Spinner, Form } from 'react-bootstrap';
import moment from 'moment';
import cryptoImage from '../images/crypto-image.png';
import newsImage from '../images/news-image.png';

function News({ simplified }) {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');

  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  if (!cryptoNews?.value)
    return <Spinner animation='border' className='spinner-loading' />;

  return (
    <div
      className='crypto-news-container '
      style={simplified && { marginTop: '0px' }}
    >
      <Form.Select
        aria-label='Select a crypto'
        onChange={(e) => setNewsCategory(e.target.value)}
        className='search-select-news'
      >
        <option>Select a crypto:</option>
        {data?.data?.coins.map((coin, i) => {
          return (
            <option value={coin.name} key={i}>
              {coin.name}
            </option>
          );
        })}
      </Form.Select>
      <Row>
        {cryptoNews?.value.map((news, i) => {
          return (
            <Col md={6} lg={4} sm={6} xl={3} className='p-2 ' key={i}>
              <a
                href={news.url}
                target='_blank'
                rel='noreferrer'
                className='card-link'
              >
                <Card md={6} lg={4} sm={6} xl={3} className='p-4'>
                  <div className='card-heading'>
                    <Card.Title className='card-news-title'>
                      {news.name}
                    </Card.Title>
                    <Card.Img
                      className='card-news-img'
                      src={
                        news?.image?.thumbnail?.contentUrl
                          ? news?.image?.thumbnail?.contentUrl
                          : newsImage
                      }
                    ></Card.Img>
                  </div>
                  <Card.Body>
                    <p className='news-description'>
                      {news.description > 100
                        ? `${news.description.substring(0.1)}...`
                        : news.description}
                    </p>
                    <div className='provider-container'>
                      <Card.Img
                        className='card-news-img-provider'
                        src={
                          news?.provider[0]?.image?.thumbnail?.contentUrl
                            ? news?.provider[0]?.image?.thumbnail?.contentUrl
                            : cryptoImage
                        }
                      ></Card.Img>
                      <Card.Title className='card-news-provider'>
                        {news?.provider[0]?.name}
                      </Card.Title>
                      <Card.Title className='card-news-date-published'>
                        {moment(news.datePublished).startOf('ss').fromNow()}
                      </Card.Title>
                    </div>
                  </Card.Body>
                </Card>
              </a>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default News;
