Template.errorslist.helpers({
    errors: function () {
        //var context = Items.simpleSchema().namedContext(this.contextName);
        //return context.invalidKeys().map(function(data){ return {message: context.keyErrorMessage(data.name)}});
        // var context = Session.get("errorsContext");
        // console.log('Template.errorslist.helpers context=');
        // console.log(context);
        // if (context) {
        //     return context.invalidKeys().map(function (data) { return { message: context.keyErrorMessage(data.name) } });
        // }
        // return;
        return Session.get("errors");
    }
});

// Template.reservation.onRendered(function () {
//     $(".close.icon").click(function () {
//         $(this).parent().hide();
//     });
// });