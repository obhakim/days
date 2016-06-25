import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';

export const Models = new Mongo.Collection('models');

Models.schema = new SimpleSchema({
  brand: { label: 'Marque', type: String },
  model: { label: 'Model', type: String},
  vehicleTypeId: { label: 'Type de véhicule', type: String},
});

Models.attachSchema(Models.schema);
/*Models.allow({

    insert: function(userId, doc){

        
    return true;

    },
    remove: function (userId, doc){
        return true;},
        update: function(userId, doc) {
             return true; // don't deny this
      }

});*/