"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const steemconnect_firebase_functions_1 = require("steemconnect-firebase-functions");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
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
exports.redirect = functions.https.onRequest((req, res) => {
    const endpoint = steemconnect_firebase_functions_1.getAuthorizationUrl(clientId, redirectUri, ['login']);
    res.redirect(endpoint);
});
//# sourceMappingURL=index.js.map