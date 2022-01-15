import { Meteor } from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data';

import React from "react";
import DocumentMeta from 'react-document-meta';

export const Welcome = () => {
  const user = useTracker(() => Meteor.user());
  const meta = {
    title: 'Welcome to B2A',
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
      <h2>Hello, {user?.username ? user?.username : 'Guest'}</h2>
    </DocumentMeta>
  );
};