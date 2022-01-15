import { onPageLoad } from "meteor/server-render";
import { 
  preloadAllLoadables, 
  LoadableCaptureProvider 
} from 'meteor/npdev:react-loadable';

import React from "react";
import ReactDOMServer from "react-dom/server";

import { ServerRouter } from '/imports/startup/@/router';


preloadAllLoadables().then(() => {
  onPageLoad(sink => {  
    const loadableHandle = {};
    const App = ReactDOMServer.renderToString(
      <LoadableCaptureProvider handle={loadableHandle}>
        <ServerRouter location={sink.request.url} />
      </LoadableCaptureProvider>
    );
    sink.renderIntoElementById("react-application", App);
    
    sink.appendToBody(loadableHandle.toScriptTag());
  });
});