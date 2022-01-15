// import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import React from "react";
import { useParams, Outlet, Navigate } from "react-router-dom";

import tasksQuery from "/imports/api/tasks/queries/tasks";

export default TaskID = () => {

  const { taskId } =  useParams();
  
  const { task, isLoading } = useTracker(() => {

    const query = tasksQuery.clone({ taskId });
    const handler = query.subscribe();

    if (!handler.ready()) 
      return { task: {}, isLoading: true };

    const task = query.fetchOne();

    if (!task) 
      return <Navigate to='/not-found' />;

    return {task};
  });

  return (
    <div>
      {/* {taskId} */}
      {isLoading && <div>loading task...</div>}
      <Outlet context={task} />
    </div>
  );
};
