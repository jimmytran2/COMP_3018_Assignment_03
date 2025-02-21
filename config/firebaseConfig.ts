import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import serviceAccount from "../comp-3018-assignment-3-firebase-adminsdk-fbsvc-4d3f8cab62.json";

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

const db: Firestore = getFirestore();

export default db;
