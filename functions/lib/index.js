"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserDocument = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
exports.createUserDocument = functions.auth.user()
    .onCreate(async (user) => {
    const newUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        providerData: user.providerData,
    };
    db.collection("users")
        .doc(user.uid)
        // シリアル化エラーを避ける
        .set(newUser);
});
//# sourceMappingURL=index.js.map