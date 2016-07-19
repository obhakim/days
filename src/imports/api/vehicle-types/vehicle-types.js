import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';

export const VehicleTypes = new Mongo.Collection('vehicletypes');

VehicleTypes.schema = new SimpleSchema({
  name: { label: 'Type de véhicule', type: String ,unique: true },
  ratePerKm: { label: 'Tarif par km', type: Number, decimal: true },
  ratePerHour: { label: 'Tarif par h', type: Number, decimal: true },
  rateMin: { label: 'Tarif Min', type: Number, decimal: true },
  rateMultiplier: { label: 'Mulitplicateur de Tarif', type: Number, decimal: true },
});

VehicleTypes.attachSchema(VehicleTypes.schema);
