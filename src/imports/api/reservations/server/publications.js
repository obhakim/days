import { Meteor } from 'meteor/meteor';
// import { check } from 'meteor/check';
// import { Match } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Roles } from 'meteor/alanning:roles';
import { Reservations } from '../reservations.js';
import { CONST } from '../../../common/constants.js';

Meteor.publish('reservations.list', function publishReservationsList(search, startDate, endDate) {
  // Simple Schema not working should be debugged
  // new SimpleSchema({
  //   search: { type: String, optional: true },
  //   startDate: { type: Date, optional: true },
  //   endDate: { type: Date, optional: true },
  // }).validate({ search, startDate, endDate });
  // in the worst case replaced with 'check' like
  // check( search, Match.OneOf( String, null, undefined ) );

  const query = {};
  const projection = { limit: 100, sort: { createdAt: -1 } };

  // Query example
  // query = {
  //   $or: [
  //     {'contact.firstname': regex},
  //     {'contact.lastname': regex},
  //   ],
  //   'ride.startAt': { $gt: startDate, $lt: endDate }
  // }

  // Apply filters
  if (search && search !== '') {
    // http://stackoverflow.com/questions/3305561/how-do-i-query-mongodb-with-like
    const regex = new RegExp(search, 'i');  // Seems to have a problem and can be simplified

    query.$or =
    [
      { 'contact.firstname': regex },
      { 'contact.lastname': regex },
      { start: regex },
      { end: regex },
    ];
  }

  if (startDate || endDate) {
    const start = startDate || new Date(0); // 01 January 1970 00:00:00 UTC
    const end = endDate || new Date();
    query['ride.startAt'] = { $gte: start, $lte: end };
  }

  // Apply security
  if (Roles.userIsInRole(this.userId, CONST.USER_ROLES.CLIENT)) {
    query.ownerId = this.userId;
  }

  console.log(query);
  return Reservations.find(query, projection);
});


Meteor.publish('reservations.count', function publishReservationsCount() {
  const query = {};

  // Apply security
  if (Roles.userIsInRole(this.userId, CONST.USER_ROLES.CLIENT)) {
    query.ownerId = this.userId;
  }

  return Reservations.find(query).count();
});
