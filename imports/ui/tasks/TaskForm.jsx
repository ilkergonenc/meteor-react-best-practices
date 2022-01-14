import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import { useForm, Controller } from 'react-hook-form';
import { 
  Flex,
  Spacer,
  Heading, 
  Stack, 
  Button, 
  Checkbox
} from '@chakra-ui/react';

import { taskInsert, taskUpdate, taskRemove } from '/imports/api/tasks/methods';
import FormControlValid from '../@/FormControlValid';

const deleteTask = ({ taskId }) => taskRemove.call({ taskId });

export const TaskForm = ({ formWithId }) => {
  
  let task;
  if(formWithId) task = useOutletContext();

  const nav = useNavigate();
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const [checked, setChecked] = useState(!!task?.isChecked);
  
  function onSubmit(values) {
    if(!formWithId)
      taskInsert.call({ ...values },
        (err, res) => {
          if (err) throw new Meteor.Error('task not updated', err);
          setTimeout(()=>{
            nav(`/tasks/${res}`);
          }, 1500);
        });
    else
      taskUpdate.call({ ...values, taskId: task?._id },
        (err, res) => {
          if (err) throw new Meteor.Error('task not updated', err);
          setTimeout(()=>{
            nav(`/tasks/${task?._id}`);
          }, 1500);
        });
  };

  const onDeleteClick = (taskId) => {
    deleteTask({ taskId });
    nav('/tasks');
  }

  useEffect(() => {
    if(formWithId) {
      setValue('text', task?.text);
      setChecked(!!task?.isChecked);
    } 
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={4}>
        <Flex>
          <Heading as='h1' size='lg'>
            {!formWithId ? 'New Task' : 'Edit Task'}
          </Heading>
          <Spacer />
          {formWithId && <Button onClick={() => onDeleteClick(task?._id)}>Delete</Button>}
        </Flex>
        <FormControlValid 
          handle='text' 
          label='Title' 
          placeholder='Task'
          rules={{
            required: 'Required',
            minLength: { value: 3, message: '3'},
          }}
          errors={errors.text}
          register={register}
        />
        {formWithId &&
          <Controller
            name='isChecked'
            control={control}
            defaultValue={checked}
            render={({ field: { onChange, value, ref } }) => (
              <Checkbox
                onChange={onChange}
                ref={ref}
                isChecked={value}
              >
                Done
              </Checkbox>
            )}
          />
        }
        <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
          {!formWithId ? 'Create' : 'Update'}
        </Button>
      </Stack>
    </form>
  );
};