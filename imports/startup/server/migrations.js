import { Tasks } from '/imports/api/tasks/tasks';

Migrations.add({
  version: 1,
  up: function() {
    console.log('up to', this.version);
    Tasks.find({body: {$exists: false}}).forEach(task => {
      const body = 'body';
      Tasks.update(task._id, {$set: {body}});
    });
  },
  down: function() {
    console.log('down to', (this.version - 1));
    Tasks.update({}, {$unset: {body: true}}, {multi: true});
  }
});

Migrations.add({
  version: 2,
  up: async function() {
    console.log('up to', this.version);
    await Tasks.find({text: {$exists: true}}).forEach(task => {
      const title = task.text;
      Tasks.update(task._id, {$set: {title}});
    });
    Tasks.update({}, {$unset: {text: true}}, {multi: true});
  },
  down: async function() {
    console.log('down to', (this.version - 1));
    await Tasks.find({title: {$exists: true}}).forEach(task => {
      const text = task.title;
      Tasks.update(task._id, {$set: {text}});
    });
    Tasks.update({}, {$unset: {title: true}}, {multi: true});
  }
});