import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import React from 'react';
import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useAuth } from './AuthProvider';

export const GuestMiddleware = () => {
  let auth = useAuth();
  let location = useLocation();

  if (auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/tasks" state={{ from: location }} replace />;
  }

  return (<Outlet />);
};