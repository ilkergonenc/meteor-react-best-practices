import Users from './collection';
import Tasks from '../tasks/collection';

Users.addLinks({
  tasks: {
    inversedBy: 'user',
    collection: Tasks
  }
});