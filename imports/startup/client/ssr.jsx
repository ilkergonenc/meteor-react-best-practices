import { onPageLoad } from "meteor/server-render";

import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import { ClientRouter } from '/imports/startup/@/router';

onPageLoad(() => {
  const App = () => (
    <ClientRouter />
  );
  hydrate(
    <App />, 
    document.getElementById("react-application")
  );
});
