Meteor.startup(function () {
    // common client / server startup

    // Translate validation messages
    SimpleSchema.messages({
        required: "[label] est obligatoire",
        minString: "[label] doit être d'au moins [min] caractères",
        maxString: "[label] ne peut pas dépasser [max] caractères",
        minNumber: "[label] doit être au moins [min]",
        maxNumber: "[label] ne peut pas dépasser [max]",
        minDate: "[label] doit être le ou après [min]",
        maxDate: "[label] ne peut pas être après [max]",
        badDate: "[label] n'est pas une date valide",
        minCount: "Vous devez spécifier au moins [minCount] valeurs",
        maxCount: "Vous ne pouvez pas spécifier plus de [maxCount] valeurs",
        noDecimal: "[label] doit être un entier",
        notAllowed: "[value] est une valeur non autorisée",
        expectedString: "[label] doit être une chaîne de caractères",
        expectedNumber: "[label] doit être un chiffre",
        expectedBoolean: "[label] doit être un booléen",
        expectedArray: "[label] doit être un tableau",
        expectedObject: "[label] doit être un objet",
        expectedConstructor: "[label] doit être un [type]",
        regEx: [
            { msg: "[label] échec de la validation de l'expression régulière" },
            { exp: SimpleSchema.RegEx.Email, msg: "[label] doit être une adresse e-mail valide" },
            { exp: SimpleSchema.RegEx.WeakEmail, msg: "[label] doit être une adresse e-mail valide" },
            { exp: SimpleSchema.RegEx.Domain, msg: "[label] doit être un nom de domaine valide" },
            { exp: SimpleSchema.RegEx.WeakDomain, msg: "[label] doit être un nom de domaine valide" },
            { exp: SimpleSchema.RegEx.IP, msg: "[label] doit être une adresse IPv4 ou IPv6 valide" },
            { exp: SimpleSchema.RegEx.IPv4, msg: "[label] doit être une adresse IPv4 valide" },
            { exp: SimpleSchema.RegEx.IPv6, msg: "[label] doit être une adresse IPv6 valide" },
            { exp: SimpleSchema.RegEx.Url, msg: "[label] doit être une URL valide" },
            { exp: SimpleSchema.RegEx.Id, msg: "[label] doit être un ID alphanumérique valide" }
        ],
        keyNotInSchema: "[key] n'est pas autorisé par le schéma"
    });
});