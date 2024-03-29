import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

export const CreateUserDocument = functions.auth.user()
    .onCreate(async (user:any) => {
        const newUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            providerData: user.providerData,
        };
        db.collection("users").doc(user.uid).set(newUser);
    });

