import { useState, useEffect } from "react";
import {
  getAuth,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";
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

  const signOut = () => {
    firebaseSignOut(auth)
      .then(() => {
        setUser(null); // Оновлюємо стан користувача
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
  return { user, signInWithGoogle,signOut };
};

export default useAuth;
