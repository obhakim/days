
Meteor.methods({

'models.modelsList'(modelsId, brand) {
        check(modelsId, String);
        check(brand, Boolean);
       
      },

});