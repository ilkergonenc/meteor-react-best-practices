import React from 'react';
import * as ReactDOM from "react-dom";
import { RouterApp } from './router';

Meteor.startup(() => {
  ReactDOM.render(
    <App />,
    document.getElementById('react-application')
    );
});

function App(){
  return (
    <RouterApp />
  );
};