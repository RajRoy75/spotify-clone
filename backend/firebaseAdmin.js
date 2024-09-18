// server/firebaseAdmin.js

// import admin from 'firebase-admin';
const admin = require('firebase-admin');

const serviceAccount = require('./musicplayground-a682d-firebase-adminsdk-5rzy3-e5254ff56c.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const verifyToken = (token) => {
  return admin.auth().verifyIdToken(token);
};

module.exports = {verifyToken};
