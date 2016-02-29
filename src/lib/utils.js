Utils = {};

Utils.isDriver = function () {
    //return Roles.userIsInRole(Meteor.user(), ['driver']);
    return Roles.userIsInRole(this.userId, ['driver']);
}