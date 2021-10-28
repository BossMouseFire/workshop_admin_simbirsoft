import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IProps } from '../types/route';

const PublicRoute: React.FC<IProps> = ({ children, isAuthenticated, path }) => {
  return (
    <Route
      path={path}
      render={({ location }) =>
        !isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/admin',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PublicRoute;
