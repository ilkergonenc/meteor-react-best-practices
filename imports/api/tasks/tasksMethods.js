import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from "simpl-schema";
import { Tasks } from '/imports/api/tasks/tasks';

const taskInsert = new ValidatedMethod({
  name: 'tasks.insert',
  validate: new SimpleSchema({
    text: { type: String }
  }).validator(),
  run({ text }) {
    if (!this.userId) throw new Meteor.Error('Not authorized.');
    try {
      Tasks.insert({
        text,
        userId: this.userId,
      });
    } catch (error) {
      throw new Meteor.Error('Could not insert collection.', error); 
    }
  }
});

const taskRemove = new ValidatedMethod({
  name: 'tasks.remove',
  validate: new SimpleSchema({
    taskId: { type: String }
  }).validator(),
  run({ taskId }) {
    if (!this.userId) throw new Meteor.Error('Not authorized.');
    const task = Tasks.findOne({ _id: taskId, userId: this.userId });
    if (!task) throw new Meteor.Error('Access denied.');
    try {
      Tasks.remove(taskId);
    } catch (error) {
      throw new Meteor.Error('Could not remove collection.', error); 
    }
  }
});

const taskSetIsChecked = new ValidatedMethod({
  name: 'tasks.setIsChecked',
  validate: new SimpleSchema({
    taskId: { type: String },
    isChecked: { type: Boolean },
  }).validator(),
  run({ taskId, isChecked }) {
    if (!this.userId) throw new Meteor.Error('Not authorized.');
    const task = Tasks.findOne({ _id: taskId, userId: this.userId });
    if (!task) throw new Meteor.Error('Access denied.');
    try {
      Tasks.update(taskId, {
        $set: {
          isChecked: !isChecked,
        },
      });
    } catch (error) {
      throw new Meteor.Error('Could not update collection.', error); 
    }
  }
});

export {
  taskInsert,
  taskRemove,
  taskSetIsChecked
};
