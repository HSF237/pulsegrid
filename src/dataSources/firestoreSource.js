import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { db, ensureFirebaseSession, firebaseEnabled } from "../config/firebase";
import { normalizeTelemetry } from "./normalizeTelemetry";

export function createFirestoreSource({ deviceId }) {
  return {
    subscribe(listener, onError) {
      if (!firebaseEnabled || !db) {
        onError?.(new Error("Firebase is not configured. Add the VITE_FIREBASE_* environment variables first."));
        return () => {};
      }

      let unsubscribe = () => {};
      let cancelled = false;

      ensureFirebaseSession()
        .then(() => {
          if (cancelled) return;
          const telemetryQuery = query(
            collection(db, "devices", deviceId, "telemetry"),
            orderBy("timestamp", "desc"),
            limit(1),
          );

          unsubscribe = onSnapshot(
            telemetryQuery,
            (snapshot) => {
              const latest = snapshot.docs[0];
              if (latest) listener(normalizeTelemetry(latest.data(), deviceId));
            },
            (error) => onError?.(error),
          );
        })
        .catch((error) => onError?.(error));

      return () => {
        cancelled = true;
        unsubscribe();
      };
    },
  };
}
