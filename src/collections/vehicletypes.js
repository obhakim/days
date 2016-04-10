VehicleTypes.attachSchema(Schema.VehicleType)

// PrePopulate data
// if (Meteor.isServer && VehicleTypes.find().count() === 0) {
if (Meteor.isServer && !VehicleTypes.findOne()) {
  Meteor.startup(function () {
    VehicleTypes.insert({ name: 'Berline', ratePerKm: 2.50, ratePerHour: 25, rateMin: 10, rateMultiplier: 1.2 })
    VehicleTypes.insert({ name: 'Luxe', ratePerKm: 3.20, ratePerHour: 35, rateMin: 15, rateMultiplier: 1.2 })
    VehicleTypes.insert({ name: 'Premium', ratePerKm: 5.00, ratePerHour: 50, rateMin: 20, rateMultiplier: 1.2 })
    VehicleTypes.insert({ name: 'Van', ratePerKm: 4.50, ratePerHour: 50, rateMin: 15, rateMultiplier: 1.2 })
  })
}
