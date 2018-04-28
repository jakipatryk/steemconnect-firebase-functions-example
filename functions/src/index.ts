import {
  getAuthorizationUrl,
  getAccessToken,
  mintFirebaseToken,
  Scope
} from 'steemconnect-firebase-functions';

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import * as CORS from 'cors';
const cors = CORS({ origin: true });

const serviceAccount = require('../serviceAccountKey.json');

/**
 * Initialize firebase-admin with serviceAccount.
 */
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Application configuration.
const redirectUri = 'redirect-url';
const clientId = functions.config().steemconnect.id; // hardcode clientId if running functions locally
const clientSecret = functions.config().steemconnect.secret; // hardcode clientSecret if running functions locally
const scope: Scope[] = ['login'];

/**
 * Cloud Function that redirects user to SteemConnect service to authorize app.
 */
export const redirect = functions.https.onRequest((req, res) => {
  const endpoint = getAuthorizationUrl({ clientId, redirectUri, scope });
  res.redirect(endpoint);
});

/**
 * Cloud Function that handles requests with `code` as a query param.
 * @returns {Promise} Promise which resolves with the Firebase custom auth token (JWT).
 */
export const callback = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    handleCallback(req)
      .then(token => res.status(200).send({ token }))
      .catch(err => res.status(400).send(err));
  });
});

/**
 * Inside this helper function you can also:
 * - save access token using saveAccessToken function for a later usage
 * - broadcast operations using this token (for example broadcastPost)
 * - create Firebase user account with additional information using createFirebaseAccount functions
 */
async function handleCallback(req) {
  const code = req.query.code;

  const accessToken = await getAccessToken({
    clientId,
    clientSecret,
    redirectUri,
    code
  });
  const uid = `steemconnect:${accessToken.username}`;

  const firebaseToken = await mintFirebaseToken(admin, uid);

  return firebaseToken;
}
