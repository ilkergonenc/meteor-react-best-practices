import Tasks from './collection';

Tasks.expose({
  firewall(userId, params) {
    if (!userId) throw new Meteor.Error('not-allowed');
  }
});