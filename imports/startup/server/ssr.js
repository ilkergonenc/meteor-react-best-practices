import { onPageLoad } from "meteor/server-render";

import React from "react";
import ReactDOMServer from "react-dom/server";

import { ServerRouter } from '/imports/startup/@/router';

onPageLoad(async sink => {  
  const App = ReactDOMServer.renderToString(
    <ServerRouter location={sink.request.url} />
  );
  sink.renderIntoElementById("react-application", App);
});
