import { Meteor } from 'meteor/meteor';
import { VehicleTypes } from '../../api/vehicle-types/vehicle-types.js';
import { Models } from '../../api/models/models.js';
// import { Lists } from '../../api/lists/lists.js';
// import { Todos } from '../../api/todos/todos.js';

// if the database is empty on server start, create some sample data.
// Meteor.startup(() => {
export const seedData = () => {
  // PrePopulate data
  // if (Meteor.isServer && VehicleTypes.find().count() === 0) {
  if (Meteor.isServer && !VehicleTypes.findOne()) {
    VehicleTypes.insert({
      name: 'Berline',
      ratePerKm: 2.50,
      ratePerHour: 25,
      rateMin: 10,
      rateMultiplier: 1.2,
    });
    VehicleTypes.insert({
      name: 'Luxe',
      ratePerKm: 3.20,
      ratePerHour: 35,
      rateMin: 15,
      rateMultiplier: 1.2,
    });
    VehicleTypes.insert({
      name: 'Premium',
      ratePerKm: 5.00,
      ratePerHour: 50,
      rateMin: 20,
      rateMultiplier: 1.2,
    });
    VehicleTypes.insert({
      name: 'Van',
      ratePerKm: 4.50,
      ratePerHour: 50,
      rateMin: 15,
      rateMultiplier: 1.2,
    });
  }

  if (Meteor.isServer && !Models.findOne()) {
    Models.insert({
      brand: 'Mercedes',
      model: 'Classe C',
      vehicleType: 'Berline',
    });
    Models.insert({
      brand: 'Mercedes',
      model: 'Classe E',
      vehicleType: 'Luxe',
    });
    Models.insert({
      brand: 'Mercedes',
      model: 'Classe S',
      vehicleType: 'Premium',
    });
    Models.insert({
      brand: 'Mercedes',
      model: 'Classe V',
      vehicleType: 'Van',
    });
    Models.insert({
      brand: 'Audi',
      model: 'A4',
      vehicleType: 'Berline',
    });
    Models.insert({
      brand: 'Audi',
      model: 'A6',
      vehicleType: 'Luxe',
    });
    Models.insert({
      brand: 'Audi',
      model: 'A8',
      vehicleType: 'Premium',
    });
    Models.insert({
      brand: 'BMW',
      model: 'Serie 3',
      vehicleType: 'Berline',
    });
    Models.insert({
      brand: 'BMW',
      model: 'Serie 5',
      vehicleType: 'Luxe',
    });
    Models.insert({
      brand: 'BMW',
      model: 'Serie 7',
      vehicleType: 'Premium',
    });
  }

  // if (Lists.find().count() === 0) {
  //   const data = [
  //     {
  //       name: 'Meteor Principles',
  //       items: [
  //         'Data on the Wire',
  //         'One Language',
  //         'Database Everywhere',
  //         'Latency Compensation',
  //         'Full Stack Reactivity',
  //         'Embrace the Ecosystem',
  //         'Simplicity Equals Productivity',
  //       ],
  //     },
  //     {
  //       name: 'Languages',
  //       items: [
  //         'Lisp',
  //         'C',
  //         'C++',
  //         'Python',
  //         'Ruby',
  //         'JavaScript',
  //         'Scala',
  //         'Erlang',
  //         '6502 Assembly',
  //       ],
  //     },
  //     {
  //       name: 'Favorite Scientists',
  //       items: [
  //         'Ada Lovelace',
  //         'Grace Hopper',
  //         'Marie Curie',
  //         'Carl Friedrich Gauss',
  //         'Nikola Tesla',
  //         'Claude Shannon',
  //       ],
  //     },
  //   ];

  //   let timestamp = (new Date()).getTime();

  //   data.forEach((list) => {
  //     const listId = Lists.insert({
  //       name: list.name,
  //       incompleteCount: list.items.length,
  //     });

  //     list.items.forEach((text) => {
  //       Todos.insert({
  //         listId,
  //         text,
  //         createdAt: new Date(timestamp),
  //       });

//       timestamp += 1; // ensure unique timestamp.
//     });
//   });
// }
};
//});