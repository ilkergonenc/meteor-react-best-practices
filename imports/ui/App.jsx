import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { withTracker } from 'meteor/react-meteor-data';
import { LoginForm } from '/imports/ui/LoginForm';
import { TaskForm } from '/imports/ui/TaskForm';
import { TasksMain } from '/imports/ui/TasksMain';
import { NotFound } from '/imports/ui/NotFound';

export const App = () => (
  <div className="app">
    <header>
      <div className="app-bar">
        <div className="app-header">
          <h1>📝️ Welcome to React Router!</h1>
        </div>
      </div>
    </header>

    <div className="main">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="task" element={<TaskForm />} />
        <Route path="tasks" element={<TasksMain />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  </div>
);