import { Meteor } from 'meteor/meteor';
import { VehicleTypes } from '../../api/vehicle-types/vehicle-types.js';
import { Models } from '../../api/models/models.js';
import { Users } from '../../api/users/users.js';
import { Roles } from 'meteor/alanning:roles';
import { CONST } from '../../common/constants.js';
import { Accounts } from 'meteor/accounts-base';

// if the database is empty on server start, create some sample data.
export const seedData = () => {
  // PrePopulate data
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

  if (Meteor.isServer && !Users.findOne({ roles: 'admin' })) {
    const userId = Accounts.createUser({
      email: 'admin@daysvtc.fr',
      password: 'admin@daysvtc.fr',
    });

    Roles.setUserRoles(userId, CONST.USER_ROLES.ADMIN);
  }
};
