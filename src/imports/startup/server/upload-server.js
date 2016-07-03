import { UploadServer } from 'meteor/tomi:upload-server';

export const setupUploadServer = () => {
  // https://github.com/tomitrescak/meteor-uploads
  UploadServer.init({
    tmpDir: process.env.PWD + '/.uploads/tmp',
    uploadDir: process.env.PWD + '/.uploads/',
    checkCreateDirectories: true, // create the directories for you
    // getDirectory: function (fileInfo, formData) {
    //   // create a sub-directory in the uploadDir based on the content type (e.g. 'images')
    //   return formData.contentType;
    // },
    // finished: function (fileInfo, formFields) {
    //   // perform a disk operation
    // },
    // cacheTime: 100,
    // mimeTypes: {
    //   xml: 'application/xml',
    //   vcf: 'text/x-vcard',
    // },
  });
};
