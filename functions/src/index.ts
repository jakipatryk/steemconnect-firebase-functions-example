import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const redirectUri = 'http://localhost:4200/redirect';
const clientId = functions.config().steemconnect.id;
const clientSecret = functions.config().steemconnect.secret;
