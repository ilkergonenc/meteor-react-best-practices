import React from 'react';
import { Routes, Route } from "react-router-dom";

import { LoginForm } from './LoginForm';
import { NotFound } from '../NotFound';

export const AuthRouter = () => (
  <Routes>
    <Route path='signin' element={<LoginForm />} />
    <Route path="*" element={<NotFound />} />
    {/* <Route path="sign" element={} >
      <Route path="up" element={} />
      <Route path="in" element={<LoginForm />} />
      <Route path="out" element={} />
    </Route>
    <Route path="activate" element={} />
    <Route path="password" element={} >
      <Route path="forget" element={} />
      <Route path="reset" element={} />
    </Route> */}
  </Routes>
);