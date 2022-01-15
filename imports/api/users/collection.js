import { Meteor } from 'meteor/meteor';

const Users = Meteor.users;

export default Users;

// Tasks.helpers({
//   fullname() {
//     return `${this.firstname} ${this.lastname}`;
//   },
//   email() {
//     return this.emails[0].address;
//   }
// });