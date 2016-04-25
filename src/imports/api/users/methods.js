import { Meteor } from 'meteor/meteor';
// import { ValidatedMethod } from 'meteor/mdg:validated-method';
// import { SimpleSchema } from 'meteor/aldeed:simple-schema';
// import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
// import { _ } from 'meteor/underscore';

// import { Users } from './users.js';

Meteor.methods({
  updateUserProfile: function (newProfile) {
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
});
