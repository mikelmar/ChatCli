import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import CryptoJS from 'crypto-js';

const style = {
  form: `h-14 w-full max-w-[928px]  flex text-xl absolute bottom-0 position: sticky`,
  input: `w-full text-xl p-3 bg-gray-900 text-white outline-none border-none`,
  button: `w-[20%] bg-green-500`,
};

const SendMessage = ({ scroll, currentChatId, encryptionKey }) => {
  const [input, setInput] = useState('');
  const sendMessage = async (e) => {
    e.preventDefault();
    if (input === '') {
      alert('Please enter a valid message');
      return;
    }
    const { uid, displayName, photoURL } = auth.currentUser;
    // Encripta el mensaje utilizando la clave de encriptación
    const encryptedText = encryptText(input);

    await addDoc(collection(db, currentChatId), {
      text: encryptedText,
      name: displayName,
      uid,
      timestamp: serverTimestamp(),
      reported: false,
      url: '',
      photoUrl: photoURL, // Agrega el link de la foto de perfil al mensaje
    });
    setInput('');
    scroll.current.scrollIntoView({ behavior: 'smooth' });
  };
  const encryptText = (text) => {
    try {
      const encryptedText = CryptoJS.AES.encrypt(text, encryptionKey).toString();
      return encryptedText;
    } catch (error) {
      console.error('Error encrypting text:', error);
      return '';
    }
  };

  return (
    <form onSubmit={sendMessage} className={style.form} style={{ flex: 1 }}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={style.input}
        type='text'
        placeholder='Message'
      />
      <button className={style.button} type='submit'>
        Send
      </button>
    </form>
  );
};

export default SendMessage;

/*
import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import CryptoJS from 'crypto-js';

const style = {
  form: `h-14 w-full max-w-[928px]  flex text-xl absolute bottom-0 position: sticky`,
  input: `w-full text-xl p-3 bg-gray-900 text-white outline-none border-none`,
  button: `w-[20%] bg-green-500`,
};

const SendMessage = ({ scroll, currentChatId, encryptionKey }) => {
  const [input, setInput] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input === '') {
      alert('Please enter a valid message');
      return;
    }
    const { uid, displayName, photoURL } = auth.currentUser;

    // Encripta el mensaje utilizando la clave de encriptación
    const encryptedText = encryptText(input);

    await addDoc(collection(db, currentChatId), {
      text: encryptedText,
      name: displayName,
      uid,
      timestamp: serverTimestamp(),
      reported: false,
      url: '',
      photoUrl: photoURL, // Agrega el link de la foto de perfil al mensaje
    });
    setInput('');
    scroll.current.scrollIntoView({ behavior: 'smooth' });
  };

  const encryptText = (text) => {
    try {
      const encryptedText = CryptoJS.AES.encrypt(text, encryptionKey).toString();
      return encryptedText;
    } catch (error) {
      console.error('Error encrypting text:', error);
      return '';
    }
  };

  return (
    <form onSubmit={sendMessage} className={style.form}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={style.input}
        type='text'
        placeholder='Message'
      />
      <button className={style.button} type='submit'>
        Send
      </button>
    </form>
  );
};

export default SendMessage;
*/