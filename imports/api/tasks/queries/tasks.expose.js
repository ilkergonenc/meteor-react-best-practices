import tasksQuery from './tasks';

tasksQuery.expose({
  firewall(userId, params) {
      if (!userId) {
          throw new Meteor.Error('not-allowed');
      }
  }
})