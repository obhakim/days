import { Meteor } from 'meteor/meteor';
import { setupSimpleSchema } from './simple-schema-messages.js';
import { seedData } from './fixtures.js';

Meteor.startup(() => {
  setupSimpleSchema();
  seedData();
});
