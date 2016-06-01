Meteor.startup(function () {
  // common client / server startup

  // TODO: replace with i18n
  // Translate validation messages
  SimpleSchema.messages({
    required: '[label] est obligatoire',
    minString: "[label] doit être d'au moins [min] caractères",
    maxString: '[label] ne peut pas dépasser [max] caractères',
    minNumber: '[label] doit être au moins [min]',
    maxNumber: '[label] ne peut pas dépasser [max]',
    minDate: '[label] doit être le ou après [min]',
    maxDate: '[label] ne peut pas être après [max]',
    badDate: "[label] n'est pas une date valide",
    minCount: 'Vous devez spécifier au moins [minCount] valeurs',
    maxCount: 'Vous ne pouvez pas spécifier plus de [maxCount] valeurs',
    noDecimal: '[label] doit être un entier',
    notAllowed: '[value] est une valeur non autorisée',
    expectedString: '[label] doit être une chaîne de caractères',
    expectedNumber: '[label] doit être un chiffre',
    expectedBoolean: '[label] doit être un booléen',
    expectedArray: '[label] doit être un tableau',
    expectedObject: '[label] doit être un objet',
    expectedConstructor: '[label] doit être un [type]',
    regEx: [
      { msg: "[label] échec de la validation de l'expression régulière" },
      { exp: SimpleSchema.RegEx.Email, msg: '[label] doit être une adresse e-mail valide' },
      { exp: SimpleSchema.RegEx.WeakEmail, msg: '[label] doit être une adresse e-mail valide' },
      { exp: SimpleSchema.RegEx.Domain, msg: '[label] doit être un nom de domaine valide' },
      { exp: SimpleSchema.RegEx.WeakDomain, msg: '[label] doit être un nom de domaine valide' },
      { exp: SimpleSchema.RegEx.IP, msg: '[label] doit être une adresse IPv4 ou IPv6 valide' },
      { exp: SimpleSchema.RegEx.IPv4, msg: '[label] doit être une adresse IPv4 valide' },
      { exp: SimpleSchema.RegEx.IPv6, msg: '[label] doit être une adresse IPv6 valide' },
      { exp: SimpleSchema.RegEx.Url, msg: '[label] doit être une URL valide' },
      { exp: SimpleSchema.RegEx.Id, msg: '[label] doit être un ID alphanumérique valide' },
    ],
    keyNotInSchema: "[key] n'est pas autorisé par le schéma",
  });
// Defaults
// SimpleSchema.messages({
//     required: "[label] is required",
//     minString: "[label] must be at least [min] characters",
//     maxString: "[label] cannot exceed [max] characters",
//     minNumber: "[label] must be at least [min]",
//     maxNumber: "[label] cannot exceed [max]",
//     minDate: "[label] must be on or after [min]",
//     maxDate: "[label] cannot be after [max]",
//     badDate: "[label] is not a valid date",
//     minCount: "You must specify at least [minCount] values",
//     maxCount: "You cannot specify more than [maxCount] values",
//     noDecimal: "[label] must be an integer",
//     notAllowed: "[value] is not an allowed value",
//     expectedString: "[label] must be a string",
//     expectedNumber: "[label] must be a number",
//     expectedBoolean: "[label] must be a boolean",
//     expectedArray: "[label] must be an array",
//     expectedObject: "[label] must be an object",
//     expectedConstructor: "[label] must be a [type]",
//     regEx: [
//         {msg: "[label] failed regular expression validation"},
//         {exp: SimpleSchema.RegEx.Email, msg: "[label] must be a valid e-mail address"},
//         {exp: SimpleSchema.RegEx.WeakEmail, msg: "[label] must be a valid e-mail address"},
//         {exp: SimpleSchema.RegEx.Domain, msg: "[label] must be a valid domain"},
//         {exp: SimpleSchema.RegEx.WeakDomain, msg: "[label] must be a valid domain"},
//         {exp: SimpleSchema.RegEx.IP, msg: "[label] must be a valid IPv4 or IPv6 address"},
//         {exp: SimpleSchema.RegEx.IPv4, msg: "[label] must be a valid IPv4 address"},
//         {exp: SimpleSchema.RegEx.IPv6, msg: "[label] must be a valid IPv6 address"},
//         {exp: SimpleSchema.RegEx.Url, msg: "[label] must be a valid URL"},
//         {exp: SimpleSchema.RegEx.Id, msg: "[label] must be a valid alphanumeric ID"}
//     ],
//     keyNotInSchema: "[key] is not allowed by the schema"
// })
})
