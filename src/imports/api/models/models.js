import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';

export const Models = new Mongo.Collection('models');

Models.schema = new SimpleSchema({
  brand: {
    label: 'Marque',
    type: String,
  },
  model: {
    label: 'Modéle',
    type: String,
  },
  vehicleTypeId: {
    label: 'Type de véhicule',
    type: String,
  },
});
Models.attachSchema(Models.schema);