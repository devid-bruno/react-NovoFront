import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const UserRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem('token') !== null;
    const userRoleId = localStorage.getItem('role');
  
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated && userRoleId === '2' ? (
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
  

export default UserRoute;