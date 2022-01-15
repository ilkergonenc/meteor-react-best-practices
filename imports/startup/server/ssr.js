import { onPageLoad } from "meteor/server-render";
import { 
  preloadAllLoadables, 
  LoadableCaptureProvider 
} from 'meteor/npdev:react-loadable';

import React from "react";
import ReactDOMServer from "react-dom/server";
import DocumentMeta from 'react-document-meta';

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
    
    sink.appendToHead(DocumentMeta.renderAsHTML());

    sink.appendToBody(loadableHandle.toScriptTag());
  });
});