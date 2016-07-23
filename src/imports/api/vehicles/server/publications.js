<<<<<<< HEAD
=======

/* eslint-disable prefer-arrow-callback */
>>>>>>> aamingenius
import { Meteor } from 'meteor/meteor';
import { Vehicles } from '../vehicles.js';

Meteor.publish('myVehicles', function publishVehicles() {
  return Vehicles.find({
<<<<<<< HEAD
    $or: [{ ownerId: this.userId }],
  });
=======
	$or: [
        { ownerId: this.userId},
      ],
  }); 
>>>>>>> aamingenius
});
