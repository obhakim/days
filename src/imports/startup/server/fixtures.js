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
      _id: 'B',
      name: 'Berline',
      ratePerKm: 2.50,
      ratePerHour: 25,
      rateMin: 10,
      rateMultiplier: 1.2,
    });
    VehicleTypes.insert({
      _id: 'L',
      name: 'Luxe',
      ratePerKm: 3.20,
      ratePerHour: 35,
      rateMin: 15,
      rateMultiplier: 1.2,
    });
    VehicleTypes.insert({
      _id: 'P',
      name: 'Premium',
      ratePerKm: 5.00,
      ratePerHour: 50,
      rateMin: 20,
      rateMultiplier: 1.2,
    });
    VehicleTypes.insert({
      _id: 'V',
      name: 'Van',
      ratePerKm: 4.50,
      ratePerHour: 50,
      rateMin: 15,
      rateMultiplier: 1.2,
    });
  }

  if (Meteor.isServer && !Models.findOne()) {
<<<<<<< HEAD
    const idB = VehicleTypes.findOne({ name: 'Berline' }, { limit: 1 });
    const idL = VehicleTypes.findOne({ name: 'Luxe' }, { limit: 1 });
    const idP = VehicleTypes.findOne({ name: 'Premium' }, { limit: 1 });
    const idV = VehicleTypes.findOne({ name: 'Van' }, { limit: 1 });

=======
      var idB = VehicleTypes.findOne({name:'Berline'}, {limit: 1});
      var idL = VehicleTypes.findOne({name:'Luxe'}, {limit: 1});
      var idP = VehicleTypes.findOne({name:'Premium'}, {limit: 1});
      var idV = VehicleTypes.findOne({name:'Van'}, {limit: 1});
   
>>>>>>> aamingenius
    Models.insert({
      brand: 'Mercedes',
      model: 'Classe C',
      vehicleTypeId: idB.name,
    });
    Models.insert({
      brand: 'Mercedes',
      model: 'Classe E',
      vehicleTypeId: idL.name,
    });
    Models.insert({
      brand: 'Mercedes',
      model: 'Classe S',
      vehicleTypeId: idP.name,
    });
    Models.insert({
      brand: 'Mercedes',
      model: 'Classe V',
      vehicleTypeId: idV.name,
    });
    Models.insert({
      brand: 'Audi',
      model: 'A4',
      vehicleTypeId: idB.name,
    });
<<<<<<< HEAD
    Models.insert({
      brand: 'Audi',
      model: 'A6',
      vehicleTypeId: idL.name,
    });
    Models.insert({
      brand: 'Audi',
      model: 'A8',
      vehicleTypeId: idP.name,
    });
    Models.insert({
      brand: 'BMW',
      model: 'Serie 3',
      vehicleTypeId: idB.name,
    });
    Models.insert({
      brand: 'BMW',
      model: 'Serie 5',
      vehicleTypeId: idL.name,
    });
    Models.insert({
      brand: 'BMW',
      model: 'Serie 7',
      vehicleTypeId: idP.name,
    });
  }
=======
      Models.insert({
      brand: 'Audi',
      model: 'A6',
      vehicleTypeId: idL.name,
          });
      Models.insert({
      brand: 'Audi',
      model: 'A8',
      vehicleTypeId: idP.name,
          });
      Models.insert({
      brand: 'BMW',
      model: 'Serie 3',
      vehicleTypeId: idB.name,
          });
      Models.insert({
      brand: 'BMW',
      model: 'Serie 5',
      vehicleTypeId: idL.name,
          });
      Models.insert({
      brand: 'BMW',
      model: 'Serie 7',
      vehicleTypeId: idP.name,
          });
    }
>>>>>>> aamingenius

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
