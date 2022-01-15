import { Meteor } from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data';

import React from "react";
import DocumentMeta from 'react-document-meta';

import { Trans, useTranslation } from 'react-i18next';

export const Welcome = () => {

  const [ t ] = useTranslation('translations');

  const user = useTracker(() => Meteor.user());

  const meta = {
    title: `${t('welcome')} to B2A`,
    description: 'I am a description, and I can create multiple tags',
    canonical: 'http://localhost:3000',
    meta: {
      charset: 'utf-8',
      name: {
        keywords: 'react,meta,document,html,tags'
      }
    }
  };
  
  return (
    <DocumentMeta {...meta}>
      <h2><Trans i18nKey="welcome"></Trans>, {user?.username ? user?.username : 'Guest'}</h2>
    </DocumentMeta>
  );
};