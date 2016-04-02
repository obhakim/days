Template.errormessage.helpers({
  meteorerror: function () {
    return Session.get(SESSION.ERROR)
  // return {error:'999',reason:'Test error'}
  }
})
