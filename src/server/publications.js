Meteor.publish('vehicletypes', function () {
    return VehicleTypes.find();
});

Meteor.publish('reservations', function () {
    //console.log('publish reservations() this.userId='+this.userId);
    //console.log('publish reservations() Roles.userIsInRole(this.userId, [driver])='+Roles.userIsInRole(this.userId, ['driver']));
    if (Herlpers.isDriver()) {
        return Reservations.find({},
            { sort: { createdAt: -1 } });
    }
    else {
        return Reservations.find({ ownerId: this.userId },
            { sort: { createdAt: -1 } });
    }
});

// search example
// Meteor.publish("allItems", function (searchQuery) {
//   var mongoQuery = {};
//   if(searchQuery){
//     _.each(_.keys(searchQuery), function(key){
//       if(_.isNumber(searchQuery[key])){
//         mongoQuery[key] = searchQuery[key];
//       }else{
//         mongoQuery[key] = {$regex: searchQuery[key], $options: 'i'};
//       }
//     });
//   }
//   return Items.find(mongoQuery,{limit:10});
// });