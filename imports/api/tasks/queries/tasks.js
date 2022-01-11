// import { Meteor } from 'meteor/meteor';
import TasksCollection from '../TasksCollection';

export default TasksCollection.createQuery('tasks', {
  text: 1, 
  isChecked: 1,
  createdAt: 1,
  user: {
    username: 1
  }
});