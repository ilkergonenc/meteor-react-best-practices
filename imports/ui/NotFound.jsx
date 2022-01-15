import React from "react";
import DocumentMeta from 'react-document-meta';
import { Trans, useTranslation } from 'react-i18next';

export const NotFound = () => {
  const [ t ] = useTranslation('translations');
  const meta = {
    title: `${t('notFound.title')}`,
    description: `${t('notFound.desc')}`,
  };
  return (
    <DocumentMeta {...meta}>
      <h2><Trans i18nKey="notFound.title"></Trans></h2>
      <p><Trans i18nKey="notFound.desc"></Trans></p>
    </DocumentMeta>
  );
};