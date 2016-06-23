/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Models } from '../Models.js';

Meteor.publish('models', function publishModels() {
    return Models.distinct( "brand" );
// });
// Meteor.publish('models', function publishModels() {
//     return Models.distinct({}, {sort: {votes: -1, submitted: -1});
// });
// var distinctEntries = _.uniq(Models.find({}, {
//     sort: {myField: 1}, fields: {myField: true}
// }).fetch().map(function(x) {
//     return x.myField;
// }), true);
// Meteor.publish('brands', function publishBrands() {

//   return Models.distinct('brand');

// });

// Meteor.publish('models', function publishModels($brand) {

//   // return Models.distinct('model',{ brand : $brand });

//   return Models.find({ brand:$brand },{ _id: 0, brand: 0 }); 

// });