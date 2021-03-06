import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from "simpl-schema";

const TasksCollection = new Mongo.Collection('tasks');

// task schema validation
TasksCollection.schema = new SimpleSchema({
  text: { type: String, max: 260 },
  isChecked: { type: Boolean, defaultValue: false },
  userId: { type: String, regEx: SimpleSchema.RegEx.Id },
  createdAt: { type: Date, optional:true }
});
TasksCollection.attachSchema(TasksCollection.schema);

// task readables
TasksCollection.publicFields = {
  text: 1, 
  isChecked: 1,
  userId: 1,
  createdAt: 1
};

// task hasOne user
TasksCollection.addLinks({
  user: {
    type: 'one',
    field: 'userId',
    collection: Meteor.users
  }
});

// task helpers
TasksCollection.helpers({
  isPrivate() {
    return !!this.userId;
  }
});

/**
 * GUARD
 * Deny all client-side updates on the Lists collection
 * When use deny make sure no other part of your app can use allow: 
 * so we allow not instead of deny
 */
TasksCollection.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; },
});

// timestamble
TasksCollection.before.insert(function (userId, document) {
  document.createdAt = new Date();
});


export default TasksCollection;