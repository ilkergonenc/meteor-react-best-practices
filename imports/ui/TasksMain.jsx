import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';

import { Tasks } from '/imports/api/tasks/tasks';
import { taskSetIsChecked, taskRemove } from '/imports/api/tasks/tasksMethods';

import { TaskItem } from './TaskItem';
import { TaskForm } from './TaskForm';

const toggleChecked = ({ taskId, isChecked }) => taskSetIsChecked.call({ taskId, isChecked });

const deleteTask = ({ taskId }) => taskRemove.call({ taskId });

export const TasksMain = () => {
  const user = useTracker(() => Meteor.user());
  const [hideCompleted, setHideCompleted] = useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } };
  const userFilter = user ? { userId: user._id } : {};
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };
  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe('tasks');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasks = Tasks.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
    const pendingTasksCount = Tasks.find(pendingOnlyFilter).count();

    return { tasks, pendingTasksCount };
  });
  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ''
  }`;
  const logout = () => Meteor.logout();
  return (
    <div>
      <h1>
        📝️ To Do List
        {pendingTasksTitle}
      </h1>
      <div className="user" onClick={logout}>
        {user?.username} 🚪
      </div>

      <TaskForm />

      <div className="filter">
        <button onClick={() => setHideCompleted(!hideCompleted)}>
          {hideCompleted ? 'Show All' : 'Hide Completed'}
        </button>
      </div>

      {isLoading && <div className="loading">loading...</div>}

      <ul className="tasks">
        {tasks.map(task => (
          <TaskItem
            key={task._id}
            task={task}
            onCheckboxClick={toggleChecked}
            onDeleteClick={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
};
