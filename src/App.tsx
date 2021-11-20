import React, { useEffect } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import AuthPage from './pages/authPage/authPage';
import PublicRoute from './routes/publicRoute';
import PrivateRoute from './routes/privateRoute';
import AdminPage from './pages/adminPage/adminPage';
import { useDispatch } from 'react-redux';
import { useTypeSelector } from './hooks/useTypeSelector';
import { getStateAuth } from './store/actionCreators/auth';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useTypeSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getStateAuth());
  }, [isAuthenticated]);

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
