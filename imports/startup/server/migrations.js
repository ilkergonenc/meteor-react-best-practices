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