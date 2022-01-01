import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from "simpl-schema";

const Tasks = new Mongo.Collection('tasks');

Tasks.schema = new SimpleSchema({
  text: { type: String, max: 260 },
  isChecked: { type: Boolean, defaultValue: false },
  userId: { type: String, regEx: SimpleSchema.RegEx.Id },
  createdAt: Date,
});

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