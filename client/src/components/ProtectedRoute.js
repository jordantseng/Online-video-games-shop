import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import history from '../history';

const ProtectedRoute = ({ component, path }) => {
  const { data: user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      history.replace('/login');
    }
  }, [user]);

  return <Route path={path} component={component} />;
};

export default ProtectedRoute;
