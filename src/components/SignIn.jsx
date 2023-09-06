import React from 'react';
import GoogleButton from 'react-google-button';
import { auth, db } from '../firebase';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import firebase from "firebase/compat/app"

const style = {
  wrapper: `flex justify-center`,
};

const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);
};

const SignIn = () => {
  const checkAndSaveUserData = async (user) => {
    try {
      // Comprobar si el usuario ya existe en la colección "users" utilizando su nombre como clave
      const userRef = doc(db, 'users', user.displayName);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        // Si el usuario no existe, guardar su información en la base de datos
        const userData = {
          name: user.displayName,
          reported: false,
          banned: false,
          isAdmin: false,
          isSuperAdmin: false,
        };
        await setDoc(userRef, userData);
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  // Manejar el inicio de sesión con Google y guardar los datos del usuario si es necesario
  auth.onAuthStateChanged((user) => {
    if (user) {
      checkAndSaveUserData(user);
    }
  });

  return (
    <div className={style.wrapper}>
      <GoogleButton onClick={googleSignIn} />
    </div>
  );
};

export default SignIn;