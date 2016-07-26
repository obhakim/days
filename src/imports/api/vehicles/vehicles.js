import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';

export const Vehicles = new Mongo.Collection('vehicles');

Vehicles.schema = new SimpleSchema({
// vehicleType: { label: 'Type de véhicule', type: String, allowedValues: Schema.getVehicleTypes() },
  ownerId: { label: 'Proprietaire', type: String, regEx: SimpleSchema.RegEx.Id },
  license: { type: String },
  registrationCard: {label: 'Carte grise ' ,type: String},
  vehicleTypeId: 	{ label: 'Type de véhicule', type: String}, //regEx: SimpleSchema.RegEx.Id 
  brand: 	{ type: String },
  model: 	{ type: String },
  regYear: 	{ type: Number },
  color: 	{ type: String },
  'photos.$': { type: Object ,optional: true },
  'photos.$.photoExtFront': { type: String },
  'photos.$.photoExtBack': 	{ type: String }, 
  'photos.$.photoExtLeft': 	{ type: String }, 
  'photos.$.photoExtRight':	{ type: String }, 
  'photos.$.photoIntFront':	{ type: String }, 
  'photos.$.photoIntBack': 	{ type: String },
});

Vehicles.attachSchema(Vehicles.schema);
Vehicles.allow({

    insert: function(){

        
    return true;

    },
    remove: function (){
        return true;},
        update: function() {
             return true; // don't deny this
      }
  })