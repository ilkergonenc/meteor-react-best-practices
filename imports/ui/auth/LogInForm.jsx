import { Meteor } from 'meteor/meteor';

import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from 'react-hook-form';

import { Stack, Button } from '@chakra-ui/react';

import FormControlValid from '../@/FormControlValid';
import { useAuth } from './@/AuthProvider';

export const LogInForm = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  let from = location.state?.from?.pathname || "/";

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit({username, password}) {
    return new Promise((resolve) => {
      setTimeout(() => {
        auth.signin({username, password}, () => {
          // Send them back to the page they tried to visit when they were
          // redirected to the login page. Use { replace: true } so we don't create
          // another entry in the history stack for the login page.  This means that
          // when they get to the protected page and click the back button, they
          // won't end up back on the login page, which is also really nice for the
          // user experience.
          navigate(from, { replace: true });
        });
      }, 1000)
    })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={4}>
        <FormControlValid 
          handle='username' 
          label='Username' 
          placeholder='@username'
          rules={{
            required: 'Required',
            minLength: { value: 3, message: '3'},
          }}
          errors={errors.username}
          register={register}
        />
        <FormControlValid 
          handle='password' 
          label='Password' 
          placeholder='********'
          type='password'
          rules={{
            required: 'Required',
            minLength: { value: 8, message: '8'},
          }}
          errors={errors.password}
          register={register}
        />
        <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
          Log in
        </Button>
      </Stack>
    </form>
  );
};
