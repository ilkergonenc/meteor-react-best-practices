import { Meteor } from 'meteor/meteor';
import TasksCollection from './TasksCollection';

Meteor.publish('tasks', function publishTasks() {
  return TasksCollection.find({ userId: this.userId }, { fields: TasksCollection.publicFields });
});

Meteor.publish('task', function publishTask(taskId) {
  return TasksCollection.find({ _id: taskId }, { fields: TasksCollection.publicFields });
});