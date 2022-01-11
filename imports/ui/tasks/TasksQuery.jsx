import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  List, 
  ListItem, 
  Flex, 
  Spacer 
} from '@chakra-ui/react';

import tasksQuery from '/imports/api/tasks/queries/tasks';

export const TasksQuery = () => {

  const { tasks, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [] };
    if (!Meteor.user()) return noDataAvailable;
    const query = tasksQuery.clone();
    const handler = query.subscribe();
    if (!handler.ready()) return { ...noDataAvailable, isLoading: true };
    const tasks = query.fetch();
    // console.log(tasks);
    return {tasks};
  });
  // const todoHandler = Meteor.subscribe('taskTodo', todoId);
  // const todos = Todos.findOne({ _id: task.todoId });
  // task.todos = todos;
  // const imageHandler = Meteor.subscribe('taskImages', taskId);
  // const images = Images.find({ taskId: task._id }).fetch();
  // task.images = images;
  return (
    <Box>
      {isLoading && <div className="loading">loading...</div>}
      <List spacing={3}>
        {tasks.map(task => (
          <ListItem key={task._id}>
          <Flex>
            <Link to={`${task._id}`} >{task.text}</Link>
            <Spacer />
            <p>@{task.user.username}</p>
          </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
