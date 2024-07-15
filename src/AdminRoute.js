import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem('token') !== null;
    const userRole = localStorage.getItem('role');
  
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated && userRole === 1 ? (
            <Component {...props} />
          ) : isAuthenticated ? (
            <Redirect to="/unauthorized" />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  };
  

export default AdminRoute;