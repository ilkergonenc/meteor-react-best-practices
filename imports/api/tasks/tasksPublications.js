import { Meteor } from 'meteor/meteor';
import { Tasks } from '/imports/api/tasks/tasks';

Meteor.publish('tasks', function publishTasks() {
  return Tasks.find({ userId: this.userId }, { fields: Tasks.defaultFields });
});
