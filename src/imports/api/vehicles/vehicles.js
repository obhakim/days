import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';

export const Vehicles = new Mongo.Collection('vehicles');

Vehicles.schema = new SimpleSchema({
  ownerId: { label: 'Proprietaire', type: String, regEx: SimpleSchema.RegEx.Id },
  license: { type: String },
  // vehicleType: { label: 'Type de véhicule', type: String, allowedValues: Schema.getVehicleTypes() },
  vehicleTypeId: { label: 'Type de véhicule', type: String, regEx: SimpleSchema.RegEx.Id },
  brand: { type: String },
  model: { type: String },
  year: { type: Number },
  color: { type: String },
  //'photos.$': { type: String }, // replace with 6 image uploads : devant avec immat, arrière avec immat, cote gauche, cote droit, intérieur avant, intérieur arrière 
});

Vehicles.attachSchema(Vehicles.schema);

