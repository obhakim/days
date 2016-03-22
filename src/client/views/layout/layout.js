Template.layout.helpers({
    version: function () {
        return Meteor.App.VERSION;
    }
});

Template.layout.rendered = function () {
    // create sidebar and attach to menu open
    $('.ui.sidebar').sidebar({ context: $('#body') }).sidebar('attach events', '.toc.item');
}