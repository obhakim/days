(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var check = Package.check.check;
var Match = Package.check.Match;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var ValidationError;

var require = meteorInstall({"node_modules":{"meteor":{"mdg:validation-error":{"validation-error.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits",function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/mdg_validation-error/validation-error.js                                              //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');                           //
                                                                                                  //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                  //
                                                                                                  //
var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');     //
                                                                                                  //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);            //
                                                                                                  //
var _inherits2 = require('babel-runtime/helpers/inherits');                                       //
                                                                                                  //
var _inherits3 = _interopRequireDefault(_inherits2);                                              //
                                                                                                  //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
                                                                                                  //
// The "details" property of the ValidationError must be an array of objects                      //
// containing at least two properties. The "name" and "type" properties are                       //
// required.                                                                                      //
var errorsPattern = [Match.ObjectIncluding({                                                      // 4
  name: String,                                                                                   // 5
  type: String                                                                                    // 6
})];                                                                                              //
                                                                                                  //
ValidationError = function (_Meteor$Error) {                                                      // 9
  (0, _inherits3['default'])(_class, _Meteor$Error);                                              //
                                                                                                  //
  function _class(errors) {                                                                       // 10
    var _this, _ret;                                                                              //
                                                                                                  //
    var message = arguments.length <= 1 || arguments[1] === undefined ? ValidationError.DEFAULT_MESSAGE : arguments[1];
    (0, _classCallCheck3['default'])(this, _class);                                               //
                                                                                                  //
    check(errors, errorsPattern);                                                                 // 11
    check(message, String);                                                                       // 12
                                                                                                  //
    return _ret = (_this = (0, _possibleConstructorReturn3['default'])(this, _Meteor$Error.call(this, ValidationError.ERROR_CODE, message, errors)), _this), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }                                                                                               //
                                                                                                  //
  // Static method checking if a given Meteor.Error is an instance of                             //
  // ValidationError.                                                                             //
                                                                                                  //
                                                                                                  //
  _class.is = function () {                                                                       //
    function is(err) {                                                                            //
      return err instanceof Meteor.Error && err.error === ValidationError.ERROR_CODE;             // 20
    }                                                                                             //
                                                                                                  //
    return is;                                                                                    //
  }();                                                                                            //
                                                                                                  //
  return _class;                                                                                  //
}(Meteor.Error);                                                                                  //
                                                                                                  //
// Universal validation error code to be use in applications and packages.                        //
ValidationError.ERROR_CODE = 'validation-error';                                                  // 25
// Default validation error message that can be changed globally.                                 //
ValidationError.DEFAULT_MESSAGE = 'Validation failed';                                            // 27
////////////////////////////////////////////////////////////////////////////////////////////////////

}]}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/mdg:validation-error/validation-error.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['mdg:validation-error'] = {}, {
  ValidationError: ValidationError
});

})();

//# sourceMappingURL=mdg_validation-error.js.map
