/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Models } from '../Models.js';

Meteor.publish('models', function models() {
  
  var distinctEntries = _.uniq(Models.find({}, {
    sort: {brand: 1}, fields: {brand: true}
}).fetch().map(function(x) {
    return x.brand;
}), true);
    return distinctEntries;
  // return Models.find()
});
// var distinctEntries = _.uniq(Models.find({}, {
//     sort: {myField: 1}, fields: {myField: true}
// }).fetch().map(function(x) {
//     return x.myField;
// }), true);
