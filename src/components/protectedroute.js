import React from 'react'
import { Redirect } from 'react-router-dom'
import DashBoard from '../pages/todolist';

const ProtectedRoute = (data) => {
  return data.authenticated ? (
    <DashBoard authenticated={data.authenticated}
      setAuthenticated={data.setAuthenticated} />
  ) : (
      <Redirect to={{ pathname: '/login' }} />
    );
}

export default ProtectedRoute;