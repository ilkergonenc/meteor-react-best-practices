import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Tasks } from '/imports/api/tasks/tasks';
import '/imports/api/tasks/tasksMethods';
import '/imports/api/tasks/tasksPublications';

const insertTask = (taskText, user) =>
  Tasks.insert({
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

  if (Tasks.find().count() === 0) {
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
        collection: Tasks,
        inversedBy: 'user'
    }
  });
  

});