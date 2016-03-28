Meteor.users.attachSchema(Schema.User);

Meteor.methods({
  updateUserProfile: function(newProfile) {
    var userId = Meteor.userId();
    // var isEmailChanged = currentProfile ? 
    //     newProfile.email != currentProfile.email : ;

    Meteor.users.update(userId, {
      $set: {
        profile: newProfile
      }
    }, {
        validationContext: 'updateUserProfile'
      });

    // if (Meteor.isServer) {
    //   this.unblock();
    //   if (isEmailChanged) {
    //     // Send notification
    //     try {
    //       Accounts.sendVerificationEmail();
    //     } catch (error) {
    //       //throw error;
    //       console.log(error);
    //     }
    //   }
    // }

    return id;
  },
});