import TasksCollection from '/imports/api/tasks/TasksCollection';

Migrations.add({
  version: 1,
  up: function() {
    console.log('up to', this.version);
    TasksCollection.find({body: {$exists: false}}).forEach(task => {
      const body = 'body';
      TasksCollection.update(task._id, {$set: {body}});
    });
  },
  down: function() {
    console.log('down to', (this.version - 1));
    TasksCollection.update({}, {$unset: {body: true}}, {multi: true});
  }
});

Migrations.add({
  version: 2,
  up: async function() {
    console.log('up to', this.version);
    await TasksCollection.find({text: {$exists: true}}).forEach(task => {
      const title = task.text;
      TasksCollection.update(task._id, {$set: {title}});
    });
    TasksCollection.update({}, {$unset: {text: true}}, {multi: true});
  },
  down: async function() {
    console.log('down to', (this.version - 1));
    await TasksCollection.find({title: {$exists: true}}).forEach(task => {
      const text = task.title;
      TasksCollection.update(task._id, {$set: {text}});
    });
    TasksCollection.update({}, {$unset: {title: true}}, {multi: true});
  }
});