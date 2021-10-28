import React, { useEffect, useState } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import AuthPage from './components/authPage/authPage';
import PublicRoute from './routes/publicRoute';
import PrivateRoute from './routes/privateRoute';
import AdminPage from './components/adminPage/adminPage';
import { authCheck } from './api/api';

const App: React.FC = () => {
  const [isAuthenticated, stateIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    getStateAuth();
  }, [isAuthenticated]);

  const getStateAuth = () => {
    authCheck()
      ?.then(() => stateIsAuthenticated(true))
      .catch(() => stateIsAuthenticated(false));
  };
  return (
    <Switch>
      <PublicRoute path={'/login'} isAuthenticated={isAuthenticated}>
        <AuthPage />
      </PublicRoute>
      <PrivateRoute path={'/admin'} isAuthenticated={isAuthenticated}>
        <AdminPage />
      </PrivateRoute>
      <Redirect to={'/login'} />
    </Switch>
  );
};
export default App;
