import './error-message.html';

import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { SESSION } from '../../common/constants.js';

Template.errormessage.helpers({
  meteorerror: function () {
    return Session.get(SESSION.ERROR);
  // return {error:'999',reason:'Test error'}
  },
});
