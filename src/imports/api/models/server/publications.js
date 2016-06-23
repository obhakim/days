/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Models } from '../models.js';

Meteor.publish('models', function models() {
  return Models.find();
 });

//   return Models.find({ brand:$brand },{ _id: 0, brand: 0 }); 

// });