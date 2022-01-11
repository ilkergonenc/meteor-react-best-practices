import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { RateLimiterMixin } from 'ddp-rate-limiter-mixin';
import SimpleSchema from "simpl-schema";

import TasksCollection from './TasksCollection';

const rateLimitDefaults = {
  numRequests: 5,
  timeInterval: 5000,
}

const taskInsert = new ValidatedMethod({
  name: 'tasks.insert',
  schema: {
    text: { type: String },
  },
  mixins: [SchemaMixin, LoggedInMixin, RateLimiterMixin],
  rateLimit: rateLimitDefaults,
  run({ text }) {
    try {
      return TasksCollection.insert({
        text,
        userId: this.userId,
      });
    } catch (error) {
      throw new Meteor.Error('Could not insert collection.', error); 
    }
  }
});

const taskUpdate= new ValidatedMethod({
  name: 'tasks.update',
  schema: {
    taskId: { type: String },
    text: { type: String },
    isChecked: { type: Boolean },
  },
  mixins: [SchemaMixin, LoggedInMixin, RateLimiterMixin],
  rateLimit: rateLimitDefaults,
  run({ taskId, text, isChecked }) {
    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });
    if (!task) throw new Meteor.Error('Access denied.');
    try {
      TasksCollection.update(taskId, {
        $set: {
          text,
          isChecked,
        }
      });
    } catch (error) {
      throw new Meteor.Error('Could not update collection.', error); 
    }
  }
});

const taskSetIsChecked = new ValidatedMethod({
  name: 'tasks.setIsChecked',
  schema: {
    taskId: { type: String },
    isChecked: { type: Boolean },
  },
  mixins: [SchemaMixin, LoggedInMixin, RateLimiterMixin],
  rateLimit: rateLimitDefaults,
  run({ taskId, isChecked }) {
    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });
    if (!task) throw new Meteor.Error('Access denied.');
    try {
      TasksCollection.update(taskId, {
        $set: {
          isChecked: !isChecked,
        },
      });
    } catch (error) {
      throw new Meteor.Error('Could not update collection.', error); 
    }
  }
});

const taskRemove = new ValidatedMethod({
  name: 'tasks.remove',
  schema: {
    taskId: { type: String }
  },
  mixins: [SchemaMixin, LoggedInMixin, RateLimiterMixin],
  rateLimit: rateLimitDefaults,
  run({ taskId }) {
    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });
    if (!task) throw new Meteor.Error('Access denied.');
    try {
      TasksCollection.remove(taskId);
    } catch (error) {
      throw new Meteor.Error('Could not remove collection.', error); 
    }
  }
});

function SchemaMixin(methodOptions) {
  methodOptions.validate = new SimpleSchema(methodOptions.schema).validator();
  return methodOptions;
};

function LoggedInMixin(methodOptions){
   const runFunction = methodOptions.run;
   methodOptions.run = function(){
     if(!this.userId) throw new Meteor.Error(`Not authorized. Only users can run this.`);
     return runFunction.call(this, ...arguments);
   };
   return methodOptions;
 };

export {
  taskInsert,
  taskUpdate,
  taskRemove,
  taskSetIsChecked
};
