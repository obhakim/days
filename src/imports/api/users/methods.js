import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { CONST } from '../../common/constants.js';

// new validated-method style

// import { ValidatedMethod } from 'meteor/mdg:validated-method';
// import { SimpleSchema } from 'meteor/aldeed:simple-schema';
// import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
// import { _ } from 'meteor/underscore';

// import { Users } from './users.js';

// export const updateProfile = new ValidatedMethod({
//   name: 'users.updateProfile',
//   validate: Users.profileSchema.validator(),
//   run(newProfile) {
//     const userId = Meteor.userId();
//     Meteor.users.update(userId, {
//       $set: {
//         profile: newProfile,
//       },
//     }, {
//       validationContext: 'users.updateProfile',
//     });
//   },
// });


// // Get list of all method names on Todos
// const USERS_METHODS = _.pluck([
//   updateProfile,
// ], 'name');

// if (Meteor.isServer) {
//   // Only allow 5 todos operations per connection per second
//   DDPRateLimiter.addRule({
//     name(name) {
//       return _.contains(USERS_METHODS, name);
//     },

//     // Rate limit per connection ID
//     connectionId() { return true; },
//   }, 5, 1000);
// }

// old style
Meteor.methods({
  updateUserProfile: (newProfile) => {
    const userId = Meteor.userId();

    if ((newProfile.creditCard.num.length === 0)
      || (newProfile.creditCard.validThruM.length === 0)
      || (newProfile.creditCard.validThruY.length === 0)
      || (newProfile.creditCard.cvv.length === 0)
      || (newProfile.creditCard.name.length === 0)) {

      throw new Meteor.Error(400, "les informations de la carte bancaire are required");

    } else if ((newProfile.street.length === 0)
      || (newProfile.city.length === 0)
      || (newProfile.zipcode.length === 0)) {

      throw new Meteor.Error(400, "les informations de l'adresse are required");

    } else {
      Meteor.users.update(userId, {
        $set: {
          profile: newProfile,
        },
      }, {
        validationContext: 'updateUserProfile',
      });
    }
  },
  // Need this to force Driver role
  createDriver: (newUser) => {

    if ((newUser.profile.creditCard.num.length === 0)
      || (newUser.profile.creditCard.validThruM.length === 0)
      || (newUser.profile.creditCard.validThruY.length === 0)
      || (newUser.profile.creditCard.cvv.length === 0)
      || (newUser.profile.creditCard.name.length === 0)) {

      throw new Meteor.Error(400, "les informations de la carte bancaire are required");

    } else if ((newUser.profile.street.length === 0)
      || (newUser.profile.city.length === 0)
      || (newUser.profile.zipcode.length === 0)) {

      throw new Meteor.Error(400, "les informations de l'adresse are required");

    } else {
      const userId = Accounts.createUser({
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        profile: newUser.profile,
      });

      Roles.addUsersToRoles(userId, CONST.USER_ROLES.DRIVER);

    }

  },
});