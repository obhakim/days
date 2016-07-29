/* global it describe:true */
import { assert } from 'meteor/practicalmeteor:chai';
import { Reservations } from './reservations.js';

describe('Reservations', () => {
  describe('.calculatePrice(ratePerKm, rateMin, rateMultiplier, startAt, distance)', () => {
    it('should return price', () => {
      const price = Reservations.calculatePrice(2.2, 5.0, 1.2, '2016-01-01 12:00:00', 10);
      assert.equal(22, price);
    });
    it('should return multiplied price for rush hours', () => {
      console.log(new Date('01/01/2016 18:00'));
      const price = Reservations.calculatePrice(2.2, 5.0, 1.2, '2016-01-01 18:00:00', 10);
      assert.equal(26.4, price);
    });
  });
});

//
// // // var assert = require('chai').assert
// describe('Array', function () {
//   describe('#indexOf()', function () {
//     it('should return -1 when the value is not present', function () {
//       console.log('reservations.test.js Array indexof')
//       assert.equal(-1, [1, 2, 3].indexOf(5))
//       assert.equal(-1, [1, 2, 3].indexOf(0))
//     })
//   })
// })
