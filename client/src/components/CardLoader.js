import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Row, Col } from 'react-bootstrap';

const CardLoader = ({ count = 4 }) => {
  return (
    <>
      <Skeleton
        height='1.8rem'
        width={200}
        style={{ margin: '1rem 0 2rem 0' }}
      />
      <Row>
        {Array(count)
          .fill()
          .map((item, index) => {
            return (
              <Col sm={12} md={6} xl={3} className='mb-2' key={index}>
                <Skeleton height='15rem' />
                <div className='mt-2'>
                  <Skeleton width='12rem' />
                </div>
                <div>
                  <Skeleton width='10rem' />
                </div>
                <div>
                  <Skeleton height='1.5rem' width={80} />
                </div>
              </Col>
            );
          })}
      </Row>
    </>
  );
};

export default CardLoader;
