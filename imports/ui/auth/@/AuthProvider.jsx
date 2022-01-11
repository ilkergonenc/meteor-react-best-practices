import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Tracker } from 'meteor/tracker';

import React, { useState, useContext, createContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    Tracker.autorun(() => {
      if (Accounts.loginServicesConfigured()) {
        setUser(Meteor.user()?.username);
        setLoading(false);
      }
    });
  });

  const signin = (newUser, callback) => {
    return Meteor.loginWithPassword(newUser.username, newUser.password, () => {
      setUser(newUser.username);
      callback();
    });
  };

  const signout = (callback) => {
    return Meteor.logout(() => {
      setUser(null);
      callback();
    });
  };

  if(loading) return <div>loading user ...</div>
  else        return <AuthContext.Provider value={{ user, signin, signout }}>{children}</AuthContext.Provider>

};

export const useAuth = () => {
  return useContext(AuthContext);
}