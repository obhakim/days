import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Match } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import { Reservations } from '../reservations.js';
import { CONST } from '../../../common/constants.js';

Meteor.publish('reservations', function (search) {
  check(search, Match.OneOf(String, null, undefined));

  let query = {};
  let projection = { limit: 10, sort: { createdAt: -1 } };

  if (search) {
    const regex = new RegExp(search, 'i');

    query = {
      $or: [
        { title: regex },
        { artist: regex },
        { year: regex },
      ],
    };

    projection.limit = 100;
  }

  if (Roles.userIsInRole(this.userId, CONST.USER_ROLES.CLIENT)) {
    query.$and = { ownerId: this.userId };
  }

  return Reservations.find(query, projection);
});
