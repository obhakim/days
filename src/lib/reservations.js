Reservations = new Mongo.Collection('reservations');

Reservations.schema = new SimpleSchema({
  start: {type: String},
  end: {type: String},
  startAt: {type: Date},
  vehicleType: {type: Number, defaultValue: 0},
  price: {type: Number, decimal: true, defaultValue: 0},
  userId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  createdAt: {type: Date, denyUpdate: true}
});

// // This Method encodes the form validation requirements.
// // By defining them in the Method, we do client and server-side
// // validation in one place.
// Reservations.methods.insert = new ValidatedMethod({
//   name: 'Invoices.methods.insert',
//   validate: new SimpleSchema({
//     email: { type: String, regEx: SimpleSchema.RegEx.Email },
//     description: { type: String, min: 5 },
//     amount: { type: String, regEx: /^\d*\.(\d\d)?$/ }
//   }).validator(),
//   run(newInvoice) {
//     // In here, we can be sure that the newInvoice argument is
//     // validated.
// 
//     if (!this.userId) {
//       throw new Meteor.Error('Invoices.methods.insert.not-logged-in',
//         'Must be logged in to create an invoice.');
//     }
// 
//     Reservations.insert(newInvoice)
//   }
// });