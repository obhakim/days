import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';

export const Companies = new Mongo.Collection('companies');

Companies.schema = new SimpleSchema({
  name: { label: 'Nom', type: String },
  driverslicense: { label: 'Permis de conduire', type: String },
  driverslicenseFile: { label: 'Permis de conduire', type: String },
  vtcLicenseFile: { label: 'Inscription au registre VTC ou licence DRE (capacité)', type: String },
  siret: { label: 'SIRET', type: String },
  kbisFile: { label: 'K bis', type: String },
  legalFile: { label: 'Extrait du casier judiciaire (3)', type: String },
  rcproFile: { label: 'Attestation de RC pro', type: String },
  insuranceFile: { label: 'Responsabilité Civile Circulation', type: String },
  vehicleFile: { label: 'Carte grise', type: String },
  medicalFile: { label: 'Attestation d\'aptitude médicale', type: String },
});

Companies.attachSchema(Companies.schema);
