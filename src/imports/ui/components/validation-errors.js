import './validation-errors.html';

import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { SESSION } from '../../startup/client/constants.js';

Template.validationerrors.helpers({
  errors: function () {
    return Session.get(SESSION.VALIDATION_ERRORS);
  },
});
