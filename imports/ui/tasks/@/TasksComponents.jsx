import { Loadable }  from 'meteor/npdev:react-loadable';

import React from 'react';

const Loading = (props) => {
  if (props.error) {
    return <div>Loadable Error!</div>;
  } else {
    return <div>Loadable.ing...</div>;
  }
};

export const TaskID = Loadable({
  loader: () => import('../TaskID'),
  meteor: () => [require.resolve('../TaskID')],
  loading: Loading,
});

export const Task = Loadable({
  loader: () => import('../Task'),
  meteor: () => [require.resolve('../Task')],
  loading: Loading,
});

export const TaskForm = Loadable({
  loader: () => import('../TaskForm'),
  meteor: () => [require.resolve('../TaskForm')],
  loading: Loading,
});

export const TaskItem = Loadable({
  loader: () => import('../TaskItem'),
  meteor: () => [require.resolve('../TaskItem')],
  loading: Loading,
});

export const Tasks = Loadable({
  loader: () => import('../Tasks'),
  meteor: () => [require.resolve('../Tasks')],
  loading: Loading,
});