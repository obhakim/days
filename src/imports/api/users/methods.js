import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { CONST } from '../../common/constants.js';
// import { check } from 'meteor/check';
import { Users } from './users.js';

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
    // var isEmailChanged = currentProfile ?
    //     newProfile.email != currentProfile.email :

    Meteor.users.update(userId, {
      $set: {
        profile: newProfile,
      },
    }, {
      validationContext: 'updateUserProfile',
    });

    // if (Meteor.isServer) {
    //   this.unblock()
    //   if (isEmailChanged) {
    //     // Send notification
    //     try {
    //       Accounts.sendVerificationEmail()
    //     } catch (error) {
    //       //throw error
    //       console.log(error)
    //     }
    //   }
    // }

  // return id
  },
  // Need this to force Driver role
  createDriver: (newUser) => {
    //  check(newUser, Users.schema.namedContext('createDriver'));
    Users.schema.validate(newUser);
    const userId = Accounts.createUser({
      username: newUser.email,
      email: newUser.email,
      password: newUser.password,
      profile: newUser.profile,
    });

    Roles.addUsersToRoles(userId, CONST.USER_ROLES.DRIVER);
  },
});
