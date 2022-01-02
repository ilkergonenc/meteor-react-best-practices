import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { RateLimiterMixin } from 'ddp-rate-limiter-mixin';
import SimpleSchema from "simpl-schema";
import { Tasks } from '/imports/api/tasks/tasks';

const rateLimitDefaults = {
  numRequests: 5,
  timeInterval: 5000,
}

const taskInsert = new ValidatedMethod({
  name: 'tasks.insert',
  schema: {
    text: { type: String }
  },
  mixins: [SchemaMixin, LoggedInMixin, RateLimiterMixin],
  rateLimit: rateLimitDefaults,
  run({ text }) {
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
  schema: {
    taskId: { type: String }
  },
  mixins: [SchemaMixin, LoggedInMixin, RateLimiterMixin],
  rateLimit: rateLimitDefaults,
  run({ taskId }) {
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
  schema: {
    taskId: { type: String },
    isChecked: { type: Boolean },
  },
  mixins: [SchemaMixin, LoggedInMixin, RateLimiterMixin],
  rateLimit: rateLimitDefaults,
  run({ taskId, isChecked }) {
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
  taskRemove,
  taskSetIsChecked
};
