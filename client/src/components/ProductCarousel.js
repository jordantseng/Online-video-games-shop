import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTopProducts } from '../actions/carousel';
import Loader from './Loader';
import Message from './Message';

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const { loading, data: topProducts, error } = useSelector(
    (state) => state.carousel
  );

  useEffect(() => {
    if (!topProducts) {
      dispatch(fetchTopProducts());
    }
  }, [topProducts, dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {topProducts.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/products/${product._id}`}>
            <Image
              src={`/api/products/${product._id}/image`}
              alt={product.name}
              fluid
            />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} ({product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
