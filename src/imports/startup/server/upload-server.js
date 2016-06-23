import { Meteor } from 'meteor/meteor';
import { UploadServer } from 'meteor/tomi:upload-server';

UploadServer.init({
    tmpDir: process.env.PWD + '/.uploads/tmp',
    uploadDir: process.env.PWD + '/.uploads/',
    checkCreateDirectories: true, // create the directories for you
 });