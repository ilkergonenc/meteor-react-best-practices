import Tasks from './collection';
import Users from '../users/collection';

Tasks.addLinks({
  user: {
    type: 'one',
    field: 'userId',
    collection: Users
  }
});