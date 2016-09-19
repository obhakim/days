/* eslint-env mocha */
/* global it describe:true */
import { assert } from 'meteor/practicalmeteor:chai';
import StubCollections from 'meteor/hwillson:stub-collections';
import { Factory } from 'meteor/dburles:factory';
import { Random } from 'meteor/random';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
// import { BrowserPolicy } from 'meteor/browser-policy';
import { CONST } from '../../common/constants.js';
import { Users } from '../../api/users/users.js';

function callHelper(template, helperName, context, args) {
  context = context || {};
  args = args || [];
  return template.__helpers[' ' + helperName].apply(context, args);
}

if (Meteor.isServer && process.env.NODE_ENV == 'development') {
    //BrowserPolicy.framing.allowAll();
    Meteor.startup(function() {  
      BrowserPolicy.content.allowEval();
      BrowserPolicy.content.allowOriginForAll('*.google.com');
      BrowserPolicy.content.allowOriginForAll('*.googleapis.com');
      BrowserPolicy.content.allowOriginForAll('*.gstatic.com');
      BrowserPolicy.content.allowFontDataUrl();
    });
}

if (Meteor.isClient) {
  // eslint-disable-next-line imports-first
  import { ReservationItem } from './reservation-item.js';

  const userId = Random.id();

  Factory.define('user', Users, { _id: userId });

  describe('Reservation-Item', () => {
    beforeEach(function () {
      StubCollections.stub([Users]);
    });

    afterEach(function () {
      StubCollections.restore();
    });

    describe('driver & reservation pending', () => {
      it('isAcceptable == true', () => {
        Factory.create('user', { _id: userId, roles: [CONST.USER_ROLES.ADMIN] });
        // SETUP
        Meteor.userId = function() {
            return userId;
        };
        const thisContext = {
          status: CONST.RESERVATION_STATUSES.CONFIRMED,
        };
        
        assert.isTrue(callHelper(Template.ReservationItem, 'isAcceptable', thisContext));
      });
    });
  });
}
