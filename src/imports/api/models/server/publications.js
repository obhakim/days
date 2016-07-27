import { Meteor } from 'meteor/meteor';

import { Models } from '../models.js';

Meteor.publish('brand', function brand() {

  return Models.find();
});