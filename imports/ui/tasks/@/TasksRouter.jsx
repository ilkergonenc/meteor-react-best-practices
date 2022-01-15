import React from 'react';
import { Routes, Route } from "react-router-dom";

import {
  TaskID,
  TaskForm,
  Task,
  Tasks
} from './TasksComponents';

export const TasksRouter = () => (
  <Routes>
    <Route path='/'>
      <Route path=":taskId" element={<TaskID />}>
        <Route path="edit" element={<TaskForm formWithId={true} />} />
        <Route index element={<Task />} />
      </Route>
      <Route path="new" element={<TaskForm formWithId={false} />} />
      <Route index element={<Tasks />} />
    </Route>
  </Routes>
);