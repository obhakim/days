
/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Reservations } from '../reservations.js';
import { Helpers } from '../../../common/helpers.js';
import { CONST } from '../../../common/constants.js';

Meteor.publish('reservations', function () {
  // console.log('publish reservations() this.userId='+this.userId)
  // console.log('publish reservations() Roles.userIsInRole(this.userId, [driver])='+Roles.userIsInRole(this.userId, [CONST.USER_ROLES.DRIVER]))
  if (Roles.userIsInRole(this.userId, CONST.USER_ROLES.DRIVER)) {
    return Reservations.find({},
      { sort: { createdAt: -1 } });
  } else {
    return Reservations.find({ ownerId: this.userId },
      { sort: { createdAt: -1 } });
  }
});
