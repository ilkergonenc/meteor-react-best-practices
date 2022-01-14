import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { useTracker } from 'meteor/react-meteor-data';

import React, { useState } from 'react';
import { 
  Heading, 
  Center, 
  Button, 
  Box, 
  List 
} from '@chakra-ui/react';

import { taskSetIsChecked, taskRemove } from '/imports/api/tasks/methods';
import tasksQuery from '/imports/api/tasks/queries/tasks';

import { TaskItem } from './TaskItem';
import { TaskForm } from './TaskForm';

const toggleChecked = ({ taskId, isChecked }) => taskSetIsChecked.call({ taskId, isChecked });

const deleteTask = ({ taskId }) => taskRemove.call({ taskId });

export const Tasks = () => {

  const user = useTracker(() => Meteor.user());

  const [hideCompleted, setHideCompleted] = useState(false);
  const [pendingTasksCount, setPendingTasksCount] = useState(0);

  const hideCompletedFilter = { isChecked: { $ne: true } };
  const userFilter = user ? { userId: user._id } : {};
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };
  const queryFilters = hideCompleted ? pendingOnlyFilter : userFilter;

  const { tasks, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [] };
    const query = tasksQuery.clone({ ...queryFilters });
    const handler = query.subscribe();
    if (!handler.ready()) return { ...noDataAvailable, isLoading: true };
    const tasks = query.fetch();
    return { tasks };
  });

  const pendingTasksCountQuery = tasksQuery.clone({ ...pendingOnlyFilter });
  Tracker.autorun(() => { 
    const handle = pendingTasksCountQuery.subscribeCount();
    if (handle.ready()) setPendingTasksCount(pendingTasksCountQuery.getCount()); 
  });

  return (
    <Box>
      <Heading as='h1' size='md'>
        To Do List {pendingTasksCount ? ` (${pendingTasksCount})` : ''}
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
