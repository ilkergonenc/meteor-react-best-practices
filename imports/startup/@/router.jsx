import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";

import { ThemeApp } from './theme';

export const ClientRouter = () => (
  <BrowserRouter>
    <ThemeApp />
  </BrowserRouter>
);

export const ServerRouter = ({ location }) => (
  <StaticRouter location={location}>
    <ThemeApp />
  </StaticRouter>
);
