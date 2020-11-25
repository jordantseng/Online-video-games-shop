import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>Welcome to Video Game e-shop | {title}</title>
      <meta name='description' content={description}></meta>
      <meta name='keywords' content={keywords}></meta>
    </Helmet>
  );
};

export default Meta;
