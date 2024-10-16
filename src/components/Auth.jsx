import { useState, useEffect } from "react";
import { getAuth, signInWithPopup } from "firebase/auth";

import { app, googleAuthProvider } from "./firebase";
const AuthProvider = (props) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((maybyUser) => {
      if (maybyUser != null) {
        return setUser(maybyUser);
      }

 
    });
    return unsub;
  }, [auth]);
const handleSignIn = () => {
  signInWithPopup(auth, googleAuthProvider)
    .then((credentials) => setUser(credentials.user))
    .catch((error) => {
      console.error("Error signing in:", error.code, error.message);
    });
};
  return (
    <div className="auth">
      {user ? (
        <p>{user.displayName}</p>
      ) : (
        <button onClick={handleSignIn}>Sign in with Google</button>
      )}
    </div>
  );
};

export default AuthProvider;
