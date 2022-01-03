import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import TasksCollection from '/imports/api/tasks/TasksCollection';
import '/imports/api/tasks/tasksMethods';
import '/imports/api/tasks/tasksPublications';
import './migrations';

const insertTask = (taskText, user) =>
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task',
    ].forEach(taskText => insertTask(taskText, user));
  }

  Meteor.users.addLinks({
    'tasks': {
        collection: TasksCollection,
        inversedBy: 'user'
    }
  });
  
  // Migrations.migrateTo(0);
  // Migrations.migrateTo(1);
  // Migrations.migrateTo(2);
  // Migrations.migrateTo('latest');

});