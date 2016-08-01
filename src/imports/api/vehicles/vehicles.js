import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';

export const Vehicles = new Mongo.Collection('vehicles');

Vehicles.schema = new SimpleSchema({
  ownerId: { label: 'Proprietaire', type: String, regEx: SimpleSchema.RegEx.Id },
  licence: { label: 'Immatriculation', type: String },
  brand: { label: 'Marque', type: String },
  model: { label: 'Modéle', type: String },
  vehicleTypeId: { label: 'Type de véhicule', type: String },
  /*
  regYear: { type: Number },
  color: { type: String },
  
  registrationCard: { label: 'Carte grise ', type: String },  
  'photos.$': { type: Object, optional: true },
  'photos.$.photoExtFront': { type: String },
  'photos.$.photoExtBack': { type: String },
  'photos.$.photoExtLeft': { type: String },
  'photos.$.photoExtRight': { type: String },
  'photos.$.photoIntFront': { type: String },
  'photos.$.photoIntBack': { type: String },
  */
});

Vehicles.attachSchema(Vehicles.schema);
