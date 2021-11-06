import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IProps } from '../types/route';

const PrivateRoute: React.FC<IProps> = ({
  children,
  isAuthenticated,
  ...props
}) => {
  return (
    <Route
      {...props}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;
