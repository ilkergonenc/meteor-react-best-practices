import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import React from "react";
import { useParams, Outlet, Navigate } from "react-router-dom";

import tasksQuery from '/imports/api/tasks/queries/tasks';

export const TaskQuery = () => {

  const { taskId } =  useParams();
  const { task, isLoading } = useTracker(() => {
    const noDataAvailable = { task: {} };
    if (!Meteor.user()) return noDataAvailable;
    const query = tasksQuery.clone({ $filters: { _id: taskId }});
    const handler = query.subscribe();
    if (!handler.ready()) return { ...noDataAvailable, isLoading: true };
    const task = query.fetchOne();
    
    if (!task) return {};
    return {task};
  });

  if(!isLoading && !task) return <Navigate to='/not-found' />

  return (
    <div>
      {/* {taskId} */}
      {isLoading && <div>loading task...</div>}
      Task: {task?.text}<br />
      Status: {task?.isChecked ? 'Done' : 'Not Done'}<br />
      {/* {task?.userId}<br /> */}
      User:@{task?.user?.username}<br />
    </div>
  );
};
