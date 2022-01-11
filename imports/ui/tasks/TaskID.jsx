import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import React from "react";
import { useParams, Outlet, Navigate } from "react-router-dom";

import TasksCollection from "/imports/api/tasks/TasksCollection";

export const TaskID = () => {

  const { taskId } =  useParams();
  const { task, isLoading } = useTracker(() => {
    const noDataAvailable = { task: {} };
    if (!Meteor.user()) return noDataAvailable;
    const handler = Meteor.subscribe('task', taskId);
    if (!handler.ready()) return { ...noDataAvailable, isLoading: true };
    const task = TasksCollection.findOne({ _id: taskId });
    if (!task) return {};
    const username = Meteor.users.findOne({ _id: task?.userId }, { fields: { username: 1 }}).username;
    task.username = username;
    return {task};
  });

  if(!isLoading && !task) return <Navigate to='/not-found' />

  return (
    <div>
      {/* {taskId} */}
      {isLoading && <div>loading task...</div>}
      <Outlet context={task} />
    </div>
  );
};
