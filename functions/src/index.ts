import { getAuthorizationUrl } from 'steemconnect-firebase-functions';

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const redirectUri = 'http://localhost:4200/redirect';

const clientId = functions.config().steemconnect.id;
const clientSecret = functions.config().steemconnect.secret;

/* Use these instead if running functions locally
**
const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';
**
*/

export const redirect = functions.https.onRequest((req, res) => {
  const endpoint = getAuthorizationUrl(clientId, redirectUri, ['login']);
  res.redirect(endpoint);
});
