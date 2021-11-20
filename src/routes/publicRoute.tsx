import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IProps } from '../types/components/route';

const PublicRoute: React.FC<IProps> = ({
  children,
  isAuthenticated,
  ...props
}) => {
  return (
    <Route
      {...props}
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
