import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({
  page,
  pages,
  isAdmin = false,
  path = '',
  keyword = '',
}) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              isAdmin
                ? `${path}/page/${x + 1}`
                : keyword
                ? `/search/${keyword}/page/${x + 1}`
                : `${path}/page/${x + 1}`
            }>
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

Paginate.prototype = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool,
  path: PropTypes.string,
  keyword: PropTypes.string,
};

export default Paginate;
