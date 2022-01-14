// import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from "simpl-schema";
// import Users from '../users/UsersCollection';

const Tasks = new Mongo.Collection('tasks');
export default Tasks;

// task schema validation
Tasks.schema = new SimpleSchema({
  text: { type: String, max: 260 },
  isChecked: { type: Boolean, defaultValue: false },
  userId: { type: String, regEx: SimpleSchema.RegEx.Id },
  createdAt: { type: Date, optional:true }
});
Tasks.attachSchema(Tasks.schema);

// task helpers
Tasks.helpers({
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
 Tasks.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; },
});

// timestamble
Tasks.before.insert(function (userId, document) {
  document.createdAt = new Date();
});