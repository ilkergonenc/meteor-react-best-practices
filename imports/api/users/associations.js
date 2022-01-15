import Users from './collection';
import Tasks from '../tasks/collection';


/**
 * User hasMany Tasks
 */
Users.addLinks({
  tasks: {
    inversedBy: 'user',
    collection: Tasks
  }
});