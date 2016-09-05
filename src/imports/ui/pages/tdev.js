import './tdev.html';


Template.TDev.helpers({
  translation() {
    const currentlanguage = FlowRouter.getParam('lang');
    return TAPi18n.__('Test_file', { lang: currentlanguage });
  },
});
