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
      const price = Reservations.calculatePrice(2.2, 5.0, 1.2, '2016-01-01 18:00:00', 10);
      assert.equal(26.4, price);
    });
  });
});
