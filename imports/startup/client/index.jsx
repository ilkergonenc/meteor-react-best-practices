import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

Meteor.startup(() => {
  ReactDOM.render(
    <BrowserRouter history={createBrowserHistory}>
      <App />
    </BrowserRouter>, 
    document.getElementById('react-target')
    );
});
