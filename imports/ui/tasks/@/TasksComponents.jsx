import { Loadable }  from 'meteor/npdev:react-loadable';
import { Loading } from '/imports/startup/@/loadable';

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