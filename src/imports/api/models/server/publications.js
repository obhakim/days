import { Meteor } from 'meteor/meteor';
import { Models } from '../models.js';

Meteor.publish('brands', function publishBrands() {
  return Models.find();
});

Meteor.publish('models', function publishModels(brand) {
  return Models.distinct('model', { brand });
});
