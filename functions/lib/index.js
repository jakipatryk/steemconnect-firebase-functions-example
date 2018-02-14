"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const steemconnect_firebase_functions_1 = require("steemconnect-firebase-functions");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const CORS = require("cors");
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
exports.redirect = functions.https.onRequest((req, res) => {
    const endpoint = steemconnect_firebase_functions_1.getAuthorizationUrl(clientId, redirectUri, ['login']);
    res.redirect(endpoint);
});
exports.callback = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        handleCallback(req)
            .then(token => res.status(200).send({ token }))
            .catch(err => res.status(400).send(err));
    });
});
function handleCallback(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const code = req.query.code;
        const accessToken = yield steemconnect_firebase_functions_1.getAccessToken(clientId, clientSecret, redirectUri, code);
        const uid = `steemconnect:${accessToken.username}`;
        const firebaseToken = yield steemconnect_firebase_functions_1.mintFirebaseToken(admin, uid);
        return firebaseToken;
    });
}
//# sourceMappingURL=index.js.map