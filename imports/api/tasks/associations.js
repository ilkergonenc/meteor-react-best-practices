import Tasks from './collection';
import Users from '../users/collection';


/**
 * Task hasOne User
 */
Tasks.addLinks({
  user: {
    type: 'one',
    field: 'userId',
    collection: Users
  }
});