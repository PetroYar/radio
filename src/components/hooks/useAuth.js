import { useState, useEffect } from "react";
import {
  getAuth,

  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { app, database, googleAuthProvider } from "../firebase"; // Змініть шлях, якщо потрібно
import { ref,get,set } from "firebase/database";
const useAuth = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((maybeUser) => {
      setUser(maybeUser || null);
    });
    return unsub;
  }, [auth]);

  
  const saveUserInfo = async (user) => {
    if (user) {
      const db = database
    const dbRef = ref(db, `users/${user.uid}`);
    const userSnapshot = await get(dbRef);
    if (!userSnapshot.exists()) {
      await set(dbRef, {
        name: user.displayName,
        email: user.email,
      });
      console.log("Інформацію про користувача успішно збережено.");
    } else {
      console.log("Інформація про користувача вже існує.");
    }
  }
};

const signInWithGoogle = async () => {
  try {
    
    const credentials = await signInWithPopup(auth, googleAuthProvider);

    
    setUser(credentials.user);
   await saveUserInfo(credentials.user)
    console.log("Успішно авторизовано:", credentials.user);
  } catch (error) {
    console.error("Помилка при авторизації:", error.code, error.message);
  }
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
