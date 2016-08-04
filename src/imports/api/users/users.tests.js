/* global it describe:true */
// import { resetDatabase } from 'meteor/xolvio:cleaner';

// describe('my module', function () {
//   beforeEach(function () {
//     resetDatabase();
//   });
// });

import { assert } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';
import { Users } from './users.js';


describe('Users', () => {
  describe('.updateUserProfile(newProfile)', () => {
    it('should pass if all credit card infos are missing', () => {
      // const thisContext = { userId: 1 };
      // Meteor.user() = function () { return { _id: "1" } }
      // this.userId = 1;

      const data = {
        lastName: 'lastName',
        firstName: 'firstName',
        phone: 'phone',
        street: 'street',
        city: 'city',
        zipcode: 'zipcode',
        birthday: new Date(),
      };

      const isValid = Users.profileSchema.namedContext('updateUserProfile').validate(data);
      const context = Users.profileSchema.namedContext('updateUserProfile');
      assert.equal(true, isValid);
      console.log(context);

      // console.log(this.userId);

      // Meteor.call('updateUserProfile', data, function updateUserProfileResult(error, result) {
      //   if (error) {
      //     const context = Meteor.users.simpleSchema().namedContext('updateUserProfile');
      //     const errors = context.invalidKeys().map(function (keys) {
      //       return {
      //         message: context.keyErrorMessage(keys.name),
      //       };
      //     });

      //     console.log(context);
      //     console.log(errors);

      //     assert.equal(true, errors);
      //   }
      // });
    });

    it('should throw exception if part of card infos are missing', () => {
      const data = {
        lastName: 'lastName',
        firstName: 'firstName',
        phone: 'phone',
        street: 'street',
        city: 'city',
        zipcode: 'zipcode',
        birthday: new Date(),
        creditCard: {
          // num: 1234567890123456,
          validThruM: 1,
          validThruY: 21,
          // cvv: 911,
          name: 'lastName firstName',
        },
      };

      const isValid = Users.profileSchema.namedContext('updateUserProfile').validate(data);
      const context = Users.profileSchema.namedContext('updateUserProfile');
      assert.equal(false, isValid);
      console.log(context);
    });
  });
});
