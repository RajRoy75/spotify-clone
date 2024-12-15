// server/firebaseAdmin.js

// import admin from 'firebase-admin';
const admin = require('firebase-admin');

const serviceAccount = require('./musicplayground-a682d-firebase-adminsdk-5rzy3-53d5a4ec9f.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const verifyToken = (token) => {
  return admin.auth().verifyIdToken(token);
};

module.exports = {verifyToken};
