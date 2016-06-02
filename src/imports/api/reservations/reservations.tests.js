<<<<<<< HEAD
import { chai, assert } from 'meteor/practicalmeteor:chai';
import { calculatePrice } from './reservations.js';

describe('Reservations', function () {
  describe('.calculatePrice(ratePerKm, rateMin, rateMultiplier, startAt, distance)', function () {
    it('should return price', function () {
      const price = calculatePrice(2.2, 5.0, 1.2, new Date('01/01/2016 12:00', 100));
      assert.equal(15, price);
    })
  })
})

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
=======
import { chai, assert } from 'meteor/practicalmeteor:chai';
import { Reservations } from './reservations.js';

describe('Reservations', function () {
  describe('.calculatePrice(ratePerKm, rateMin, rateMultiplier, startAt, distance)', function () {
    it('should return price', function () {
      const price = Reservations.calculatePrice(2.2, 5.0, 1.2, new Date('2016-01-01 12:00:00'), 100);
      assert.equal(220, price);
    });
    it('should return multiplied price for rush hours', function () {
      console.log(new Date('01/01/2016 18:00'));
      const price = Reservations.calculatePrice(2.2, 5.0, 1.2, new Date('2016-01-01 18:00:00'), 100);
      assert.equal(264, price);
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
>>>>>>> 1b002b886c892d92164b641f23b1a25ad5a5b094
