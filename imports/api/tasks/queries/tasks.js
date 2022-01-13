// import { Meteor } from 'meteor/meteor';
import TasksCollection from '../TasksCollection';

export default TasksCollection.createQuery('tasks', {
  $filter({filters, params}) {
    if(params.taskId)     filters._id = params.taskId
    if(params.userId)     filters.userId = params.userId
    if(params.isChecked)  filters.isChecked = params.isChecked
  },
  $options: { createdAt: -1 },
  text: 1, 
  isChecked: 1,
  createdAt: 1,
  user: {
    username: 1
  }
});