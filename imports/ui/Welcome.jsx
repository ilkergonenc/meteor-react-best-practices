import { Meteor } from "meteor/meteor";
import React from "react";
import { useTracker } from 'meteor/react-meteor-data';

export const Welcome = () => {
  const user = useTracker(() => Meteor.user());
  return (
    <h2>Hello, {user?.username}</h2>
  );
};