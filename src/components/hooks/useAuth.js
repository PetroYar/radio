import { useState, useEffect } from "react";
import { getAuth, signInWithPopup } from "firebase/auth";
import { app, googleAuthProvider } from "../firebase"; // Змініть шлях, якщо потрібно

const useAuth = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((maybeUser) => {
      setUser(maybeUser || null);
    });
    return unsub;
  }, [auth]);

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((credentials) => setUser(credentials.user))
      .catch((error) => {
        console.error("Error signing in:", error.code, error.message);
      });
  };

  return { user, signInWithGoogle };
};

export default useAuth;
