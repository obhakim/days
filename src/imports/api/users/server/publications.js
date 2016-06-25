/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { Users } from '../users.js';
import { Helpers } from '../../../common/helpers.js';

Meteor.publish('users', function () {
  // console.log('publish reservations() this.userId='+this.userId)
  // console.log('publish reservations() Roles.userIsInRole(this.userId, [driver])='+Roles.userIsInRole(this.userId, [CONST.USER_ROLES.DRIVER]))
   
   //	console.log(Meteor.userId());
    Roles.addUsersToRoles(userId, 'Driver');
    return Meteor.userId(); 
});
