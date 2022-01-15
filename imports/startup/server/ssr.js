import { onPageLoad } from "meteor/server-render";
import { 
  preloadAllLoadables, 
  LoadableCaptureProvider 
} from 'meteor/npdev:react-loadable';

import React from "react";
import ReactDOMServer from "react-dom/server";
import DocumentMeta from 'react-document-meta';
import { I18nextProvider } from 'react-i18next';

import i18n from '/imports/startup/@/i18n';
import { ServerRouter } from '/imports/startup/@/router';

preloadAllLoadables().then(() => {
  onPageLoad(sink => {  

    const loadableHandle = {};

    const App = ReactDOMServer.renderToString(
      <I18nextProvider i18n={i18n}>
        <LoadableCaptureProvider handle={loadableHandle}>
          <ServerRouter location={sink.request.url} />
        </LoadableCaptureProvider>
      </I18nextProvider>
    );

    sink.renderIntoElementById("react-application", App);
    
    sink.appendToHead(DocumentMeta.renderAsHTML());

    sink.appendToBody(loadableHandle.toScriptTag());
  });
});