import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';

export const Companies = new Mongo.Collection('companies');

Companies.schema = new SimpleSchema({
  name: { label: 'Nom', type: String },
  license: { label: 'Permis de conduire', type: String },
//   license: { label: 'Permis de conduire', type: String },
//   - Permis de conduire [à saisir et charger une photocopie]
// - Inscription au registre VTC ou licence DRE (capacité) [à charger]
// - K bis et SIRET [à saisir et charger une photocopie]
// - Extrait du casier judiciaire (3) [à charger]
// - Attestation de RC pro [à charger]
// - Responsabilité Civile Circulation pour un usage du véhicule pour le transport de personnes à titre onéreux / copie carte verte [à charger]
// - Carte grise [à charger]
// - Attestation d'aptitude médicale [à charger]
});

Companies.attachSchema(Companies.schema);
