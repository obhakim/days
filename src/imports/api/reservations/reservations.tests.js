import { chai, assert } from 'meteor/practicalmeteor:chai'
import { calculatePrice } from './reservations.js'
describe('Reservations', function () {
  describe('.calculatePrice(ratePerKm, rateMin, rateMultiplier, startAt, distance)', function () {
    it('should return price', function () {
      var price = calculatePrice(2.2, 5.0, 1.2, new Date('01/01/2016 12:00', 100))
      assert.equal(15, price)
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