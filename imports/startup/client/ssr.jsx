import { onPageLoad } from "meteor/server-render";

import React, { Suspense } from 'react';
import { useSSR } from 'react-i18next';
import { hydrate } from 'react-dom';

import { ClientRouter } from '/imports/startup/@/router';

import '/imports/startup/@/i18n';

onPageLoad(() => {
  const App = () => {
    useSSR(window.initialI18nStore, window.initialLanguage);
    return (
      <Suspense fallback={<p>Still loading i18n...</p>}>
        <ClientRouter />
      </Suspense>
    );
  };
  hydrate(
    <App />, 
    document.getElementById("react-application")
  );
});
