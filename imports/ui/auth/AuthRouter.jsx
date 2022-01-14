import React from 'react';
import { Routes, Route } from "react-router-dom";

import { LogInForm } from './LogInForm';
import { SignUpForm } from './SignUpForm';

import { NotFound } from '../NotFound';

export const AuthRouter = () => (
  <Routes>
    <Route path='login' element={<LogInForm />} />
    <Route path='join' element={<SignUpForm />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);