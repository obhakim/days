import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';

export const Vehicles = new Mongo.Collection('vehicles');

Vehicles.schema = new SimpleSchema({
  ownerId: { label: 'Proprietaire', type: String, regEx: SimpleSchema.RegEx.Id },
  license: { type: String },
  // vehicleType: { label: 'Type de véhicule', type: String, allowedValues: Schema.getVehicleTypes() },
  vehicleTypeId: { label: 'Type de véhicule', type: String, regEx: SimpleSchema.RegEx.Id },
  color: { type: String },
  'photos.$': { type: String },
});

Vehicles.attachSchema(Vehicles.schema);
