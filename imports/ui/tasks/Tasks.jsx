import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import React, { useState } from 'react';
import { 
  Heading, 
  Center, 
  Button, 
  Box, 
  List 
} from '@chakra-ui/react';

import TasksCollection from "/imports/api/tasks/TasksCollection";
import { taskSetIsChecked, taskRemove } from '/imports/api/tasks/tasks.methods';

import { TaskItem } from './TaskItem';
import { TaskForm } from './TaskForm';

const toggleChecked = ({ taskId, isChecked }) => taskSetIsChecked.call({ taskId, isChecked });

const deleteTask = ({ taskId }) => taskRemove.call({ taskId });

export const Tasks = () => {

  const user = useTracker(() => Meteor.user());
  const [hideCompleted, setHideCompleted] = useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } };
  const userFilter = user ? { userId: user._id } : {};
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };
  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) return noDataAvailable;
    const handler = Meteor.subscribe('tasks');
    if (!handler.ready()) return { ...noDataAvailable, isLoading: true };
    const tasks = TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      { sort: { createdAt: -1 }, }
    ).fetch();
    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();
    return { tasks, pendingTasksCount };
  });
  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ''
  }`;

  return (
    <Box>
      <Heading as='h1' size='md'>
        To Do List {pendingTasksTitle}
      </Heading>

      <TaskForm formWithId={false} />

      <Center>
        <Button mt={4} colorScheme='teal' type='button' onClick={() => setHideCompleted(!hideCompleted)}>
          {hideCompleted ? 'Show All' : 'Hide Completed'}
        </Button>
      </Center>

      {isLoading && <div className="loading">loading...</div>}

      <List spacing={3}>
        {tasks.map(task => (
          <TaskItem
            key={task._id}
            task={task}
            onCheckboxClick={toggleChecked}
            onDeleteClick={deleteTask}
          />
        ))}
      </List>
    </Box>
  );
};
