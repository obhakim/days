/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Companies } from '../companies.js';

Meteor.publish('myCompany', function publishCompany() {
  return Companies.find(); // Todo filter by current user
});
