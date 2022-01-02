import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from "simpl-schema";

const Tasks = new Mongo.Collection('tasks');

Tasks.schema = new SimpleSchema({
  text: { type: String, max: 260, optional: true },
  title: { type: String, max: 260, optional: true },
  body: { type: String, defaultValue: '' },
  isChecked: { type: Boolean, defaultValue: false },
  userId: { type: String, regEx: SimpleSchema.RegEx.Id },
  createdAt: Date,
});

Tasks.defaultFields = {
  text: 1, 
  isChecked: 1,
  userId: 1,
  createdAt: 1
}

Tasks.attachSchema(Tasks.schema);

Tasks.helpers({
  isPrivate() {
    return !!this.userId;
  }
});

Tasks.addLinks({
  user: {
    type: 'one',
    field: 'userId',
    collection: Meteor.users
  }
});

export { Tasks };