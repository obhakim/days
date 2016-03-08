VehicleTypes.attachSchema(new SimpleSchema({
    name: { label: "Type de véhicule", type: String },
    rate: { label: "Tarif", type: Number, decimal: true }
}));

// PrePopulate data
//if (Meteor.isServer && VehicleTypes.find().count() === 0) {
if (Meteor.isServer && !VehicleTypes.findOne()) {
    Meteor.startup(function () {
        VehicleTypes.insert({ name: "Audi A6", rate: 2.00 });
        VehicleTypes.insert({ name: "Audi A8", rate: 2.20 });
        VehicleTypes.insert({ name: "Mercedes Classe E", rate: 2.20 });
        VehicleTypes.insert({ name: "Mercedes Classe S", rate: 2.50 });
        VehicleTypes.insert({ name: "Caravelle Minibus", rate: 2.50 });
        VehicleTypes.insert({ name: "Mercedes Classe V Minibus", rate: 2.50 });
    });
}