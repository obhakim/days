VehicleTypes = new Mongo.Collection('vehicletypes');

VehicleTypes.attachSchema(new SimpleSchema({
    name: {label: "Type de véhicule", type: String}
}));