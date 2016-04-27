import './validation-errors.html';

import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { SESSION } from '../../common/constants.js';

Template.validationerrors.helpers({
  errors: function () {
    return Session.get(SESSION.VALIDATION_ERRORS);
  },
});
