import React from 'react';
import { useForm } from 'react-hook-form';
import { Stack, Button, Box } from '@chakra-ui/react';

import FormControlValid from '../@/FormControlValid';

export const SignUpForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        resolve()
      }, 3000)
    })
  }

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
          handle='email' 
          label='Email' 
          placeholder='your@email.co'
          type='email'
          rules={{
            required: 'Required',
            pattern: { 
              value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
              message: 'Email is not valid'
            },
          }}
          errors={errors.email}
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
          Sign Up
        </Button>
      </Stack>
    </form>
  )
};