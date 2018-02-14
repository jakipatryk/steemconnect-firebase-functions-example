import {
  getAuthorizationUrl,
  getAccessToken,
  mintFirebaseToken
} from 'steemconnect-firebase-functions';

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import * as CORS from 'cors';
const cors = CORS({ origin: true });

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

export const callback = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    handleCallback(req)
      .then(token => res.status(200).send({ token }))
      .catch(err => res.status(400).send(err));
  });
});

async function handleCallback(req) {
  const code = req.query.code;

  const accessToken = await getAccessToken(
    clientId,
    clientSecret,
    redirectUri,
    code
  );
  const uid = `steemconnect:${accessToken.username}`;

  const firebaseToken = await mintFirebaseToken(admin, uid);

  return firebaseToken;
}
