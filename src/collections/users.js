Meteor.users.attachSchema(Schema.User);

Meteor.methods({
  updateUserProfile: function(newProfile) {
    var userId = Meteor.userId();
    var currentProfile = Meteor.user().profile;
    var isEmailChanged = newProfile.email != currentProfile.email;

    Meteor.users.update(userId, {
      $set: {
        profile: newProfile
      }
    });

    if (Meteor.isServer) {
      this.unblock();
      if (isEmailChanged) {
        // Send notification
        try {
          Accounts.sendVerificationEmail();
        } catch (error) {
          //throw error;
          console.log(error);
        }
      }
    }

    return id;
  },
});