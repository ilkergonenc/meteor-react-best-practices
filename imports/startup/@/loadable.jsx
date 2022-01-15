import React from 'react';

export const Loading = (props) => {
  if (props.error) {
    return <div>Loadable Error!</div>;
  } else {
    return <div>Loadable.ing...</div>;
  }
};