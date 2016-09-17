import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { CONST } from '../../common/constants.js';
import { Users } from './users.js';

Meteor.methods({
  updateUserProfile: (newProfile) => {
    const userId = Meteor.userId();
    Users.profileSchema.validate(newProfile);

    Meteor.users.update(userId, {
      $set: {
        profile: newProfile,
      },
    }, {
      validationContext: 'updateUserProfile',
    });
  },
  // Need this to force Driver role
  createDriver: (newUser) => {
    Users.schema.validate(newUser);
    const userId = Accounts.createUser({
      email: newUser.email,
      password: newUser.password,
      profile: newUser.profile,
    });
    // Roles.addUsersToRoles(userId, CONST.USER_ROLES.DRIVER);
    // set role to user
    Roles.setUserRoles(userId, CONST.USER_ROLES.DRIVER);
  },
});
