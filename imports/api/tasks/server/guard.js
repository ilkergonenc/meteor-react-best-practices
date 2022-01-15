import Tasks from '../collection';
/**
 * GUARD
 * Deny all client-side updates on the Lists collection
 * When use deny make sure no other part of your app can use allow: 
 * so we allow not instead of deny
 */
 Tasks.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; },
});
