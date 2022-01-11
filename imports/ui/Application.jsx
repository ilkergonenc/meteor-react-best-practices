import React from 'react';
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from './auth/@/AuthProvider';
import { LayoutProvider } from './@/LayoutProvider';
import { Navigation } from './@/Navigation';

import { GuestMiddleware } from './auth/@/GuestMiddleware';
import { Welcome } from './Welcome';
import { AuthRouter } from './auth/AuthRouter';

import { AuthMiddleware } from './auth/@/AuthMiddleware';
import { TasksRouter } from './tasks/TasksRouter';

import { NotFound } from './NotFound';

export const Application = () => (
  <AuthProvider>
    <LayoutProvider
      nav={(<Navigation />)}
      routes={(
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route element={<GuestMiddleware />}>
            <Route path="/" element={<Welcome />} />
            <Route path="/*" element={<AuthRouter />} />
          </Route>
          <Route element={<AuthMiddleware />}>
            <Route path="tasks/*" element={<TasksRouter />} />
          </Route>
        </Routes>
      )}
    />
  </AuthProvider>
);
