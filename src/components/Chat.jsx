import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import SendMessage from './SendMessage';
import { db, auth } from '../firebase';
import { updateDoc } from 'firebase/firestore';
import { query, collection, orderBy, onSnapshot, deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import UploadFile from './UploadFile';
import CryptoJS from 'crypto-js';

const style = {
  main: `flex flex-col p-[5px] mt-5 overflow-auto mb-10`,
  chatId: `text-lg font-semibold mb-2`,
};

const Chat = ({ currentChatId }) => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null); // New state to store user information
  const [userProfilePhotoUrl, setUserProfilePhotoUrl] = useState('');
  const scroll = useRef();

  const encryptionKey = 'clave-de-encriptacion-secreta'; // Define la clave de encriptación

  useEffect(() => {
    const q = query(collection(db, currentChatId), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        const message = doc.data();

        // Descifra el campo "text" utilizando la clave de encriptación
        const decryptedText = decryptText(message.text);

        messages.push({ ...message, id: doc.id, text: decryptedText });
      });
      setMessages(messages);
      console.log(messages);
    });

    setTimeout(() => {
      scroll.current.scrollIntoView({ behavior: 'smooth' });
    }, 500);

    // Set user information after sign-in
    setUser(auth.currentUser);

    return () => unsubscribe();
  }, [currentChatId]);

  const decryptText = (encryptedText) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedText, encryptionKey);
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedText;
    } catch (error) {
      console.error('Error decrypting text:', error);
      return '';
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteDoc(doc(db, currentChatId, messageId));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleReportUser = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        reported: true,
      });
      console.log('User reported successfully.');
      alert('Message reported successfully');
    } catch (error) {
      console.error('Error reporting user:', error);
    }
  };

  useEffect(() => {
    // Check if the user is signed in and update user information if needed
    const checkUserSignIn = async () => {
      if (auth.currentUser) {
        // Check if the user document already exists
        const userRef = doc(db, 'users', auth.currentUser.displayName);
        const userDoc = await getDoc(userRef);
  
        if (!userDoc.exists()) {
          // If the user document doesn't exist, create it with default values
          await setDoc(userRef, {
            name: auth.currentUser.displayName,
            reported: false,
            banned: false,
            isadmin: false,
            photourl: auth.currentUser.photoURL || '',
          });
        } else {
          setUser({
            ...auth.currentUser,
            photoUrl: userDoc.data().photoUrl,
          });
        }
  
        // Set user information in the state
        setUser(auth.currentUser);
  
        setUserProfilePhotoUrl(auth.currentUser.photoURL || '');
      }
    };
  
    checkUserSignIn();
  }, []);
  
  

  return (
    <>
      <main className={style.main} style={{ overflowY: 'auto' }}>
        {messages &&
          messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              onDelete={handleDeleteMessage}
              onReport={handleReportUser}
              encryptionKey={encryptionKey}
              currentChatId={currentChatId}
              userProfilePhotoUrl={userProfilePhotoUrl} // Pasa la URL al componente Message
            />
          ))}
        <span ref={scroll}></span>
      </main>
      {user && (
        <>
          <SendMessage
          scroll={scroll}
          currentChatId={currentChatId}
          encryptionKey={encryptionKey}
          style={{ flex: 1 }} // Ajusta el ancho del componente SendMessage
        />
        <UploadFile
          currentChatId={currentChatId}
          encryptionKey={encryptionKey}
          style={{ flex: 1 }} // Ajusta el ancho del componente UploadFile
        />
        </>
        
      )}
    </>
  );
};

export default Chat;

/*
import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import SendMessage from './SendMessage';
import { db, auth } from '../firebase';
import { updateDoc } from 'firebase/firestore';
import { query, collection, orderBy, onSnapshot, deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import UploadFile from './UploadFile';
import CryptoJS from 'crypto-js';

const style = {
  main: `flex flex-col p-[5px] mt-5 overflow-auto mb-10`,
  chatId: `text-lg font-semibold mb-2`,
};

const Chat = ({ currentChatId }) => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null); // New state to store user information
  const [userProfilePhotoUrl, setUserProfilePhotoUrl] = useState('');
  const scroll = useRef();

  const encryptionKey = 'clave-de-encriptacion-secreta'; // Define la clave de encriptación

  useEffect(() => {
    const q = query(collection(db, currentChatId), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        const message = doc.data();

        // Descifra el campo "text" utilizando la clave de encriptación
        const decryptedText = decryptText(message.text);

        messages.push({ ...message, id: doc.id, text: decryptedText });
      });
      setMessages(messages);
      console.log(messages);
    });

    setTimeout(() => {
      scroll.current.scrollIntoView({ behavior: 'smooth' });
    }, 500);

    // Set user information after sign-in
    setUser(auth.currentUser);

    return () => unsubscribe();
  }, [currentChatId]);

  const decryptText = (encryptedText) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedText, encryptionKey);
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedText;
    } catch (error) {
      console.error('Error decrypting text:', error);
      return '';
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteDoc(doc(db, currentChatId, messageId));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleReportUser = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        reported: true,
      });
      console.log('User reported successfully.');
      alert('Message reported successfully');
    } catch (error) {
      console.error('Error reporting user:', error);
    }
  };

  useEffect(() => {
    // Check if the user is signed in and update user information if needed
    const checkUserSignIn = async () => {
      if (auth.currentUser) {
        // Check if the user document already exists
        const userRef = doc(db, 'users', auth.currentUser.displayName);
        const userDoc = await getDoc(userRef);
  
        if (!userDoc.exists()) {
          // If the user document doesn't exist, create it with default values
          await setDoc(userRef, {
            name: auth.currentUser.displayName,
            reported: false,
            banned: false,
            isadmin: false,
            photourl: auth.currentUser.photoURL || '',
          });
        } else {
          setUser({
            ...auth.currentUser,
            photoUrl: userDoc.data().photoUrl,
          });
        }
  
        // Set user information in the state
        setUser(auth.currentUser);
  
        setUserProfilePhotoUrl(auth.currentUser.photoURL || '');
      }
    };
  
    checkUserSignIn();
  }, []);
  
  

  return (
    <>
      <main className={style.main}>
        {messages &&
          messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              onDelete={handleDeleteMessage}
              onReport={handleReportUser}
              encryptionKey={encryptionKey}
              currentChatId={currentChatId}
              userProfilePhotoUrl={userProfilePhotoUrl} // Pasa la URL al componente Message
            />
          ))}
        <span ref={scroll}></span>
      </main>
      {user && (
        <>
          <SendMessage scroll={scroll} currentChatId={currentChatId} encryptionKey={encryptionKey} />
          <UploadFile currentChatId={currentChatId} encryptionKey={encryptionKey} />
        </>
      )}
    </>
  );
};

export default Chat;
*/