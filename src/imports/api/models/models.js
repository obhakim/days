import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';

export const Models = new Mongo.Collection('models');

Models.schema = new SimpleSchema({
  brand: { label: 'Marque', type: String },
  model: { label: 'Model', type: String},
  vehicleTypeId: { label: 'Type de véhicule', type: String, regEx: SimpleSchema.RegEx.Id },
});

Models.attachSchema(Models.schema);
