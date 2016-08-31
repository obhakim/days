import './tdev.html';


Template.TDev.helpers({
  languages() {
    const obj = TAPi18n.getLanguages();
    const languages = [];
    for (const key in obj) {
      if (key) languages.push({
          code: key,
          labels: obj[key]
        });
    }
    if (languages) return languages;
  },
});