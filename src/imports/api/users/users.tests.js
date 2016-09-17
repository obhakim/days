/* global it describe:true */
import { assert } from 'meteor/practicalmeteor:chai';
import { Users } from './users.js';

describe('Users', () => {
  describe('.updateUserProfile(newProfile)', () => {
    it('should pass if all credit card infos are missing', () => {

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
      Users.profileSchema.namedContext('updateUserProfile');
      assert.equal(true, isValid);
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
      Users.profileSchema.namedContext('updateUserProfile');
      assert.equal(false, isValid);
    });
  });
});
