import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, addDoc, updateDoc, doc, serverTimestamp, getDoc } from 'firebase/firestore';
import CryptoJS from 'crypto-js';

const style = {
  message: `flex items-center shadow-xl m-4 py-2 px-3 rounded-tl-full rounded-tr-full`,
  name: `absolute mt-[-4rem] text-gray-600 text-xs`,
  sent: `bg-[#395dff] text-white flex-row-reverse text-end float-right rounded-bl-full`,
  received: `bg-[#e5e5ea] text-black float-left rounded-br-full text-left`,
  writer: `text-black-600 text-base mt-1`, // Cambio en el tamaño del texto
  link: `text-white-600 hover:text-blue-800 underline-none cursor-pointer`,
  deleteButton: `text-red-500 ml-2 cursor-pointer`,
  reportButton: `text-yellow-500 ml-2 cursor-pointer`,
};

const Message = ({ message, onDelete, onReport, encryptionKey, currentChatId }) => {

  const [userProfilePhotoUrl, setUserProfilePhotoUrl] = useState('');
  // Clase de mensaje según si es enviado o recibido
  const messageClass =
    message.uid === auth.currentUser.uid ? `${style.sent}` : `${style.received}`;

  // Check if the message has a URL
  const hasURL =
    message.hasOwnProperty('url') &&
    (message.url.startsWith('http://') || message.url.startsWith('https://'));

  // Función para encriptar el texto del mensaje
  const encryptText = (text) => {
    try {
      const encryptedText = CryptoJS.AES.encrypt(text, encryptionKey).toString();
      return encryptedText;
    } catch (error) {
      console.error('Error encrypting text:', error);
      return '';
    }
  };
  // Función para reportar un mensaje
  const handleReportMessage = async () => {
    try {
      // Encriptar el texto del mensaje antes de guardarlo en la colección "reported messages"
      const encryptedText = encryptText(message.text);

      // Agregar el mensaje y su información encriptada a la colección "reported messages"
      await addDoc(collection(db, 'reported messages'), {
        name: message.name,
        text: encryptedText, // Guardar el texto encriptado en lugar del texto original
        timestamp: serverTimestamp(),
        // Agrega otros campos relevantes del mensaje si es necesario
      });

      // Llamar a la función onReport para que se realicen otras acciones necesarias
      onReport(message.name);

      await updateDoc(doc(db, currentChatId, message.id), {
        reported: true,
      });

      console.log('Mensaje reportado con éxito.');
    } catch (error) {
      console.error('Error al reportar el mensaje:', error);
    }
  };

  return (
    <div>
      <div
        className={`${style.message} ${messageClass}`}
        style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', wordBreak: 'break-all', maxWidth: '45ch' }}>
        {hasURL ? (
          <div className={style.writer}>
            <div className={style.profileImage}>
              <img src={message.photoUrl } alt = "Profile" title={message.name} className="rounded-full w-8 h-8 mr-2" />
            </div>
            <a href={message.url} target="_blank" rel="noopener noreferrer" className={style.link}>
              {message.text}
            </a>
          </div>
        ) : (
          <div className={style.writer}>
            <div className={style.profileImage}>
              <img src={message.photoUrl } alt = "Profile" title={message.name} className="rounded-full w-8 h-8 mr-2" />
            </div>
            <p>{message.text}</p>
          </div>
        )}
        {message.uid === auth.currentUser.uid && (
          <span onClick={() => onDelete(message.id)} className={style.deleteButton}>
            🗑️
          </span>
        )}
        {message.uid !== auth.currentUser.uid && (
          <span onClick={handleReportMessage} className={style.reportButton}>
            🚩
          </span>
        )}
      </div>
    </div>
  );
};

export default Message;

/*
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, addDoc, updateDoc, doc, serverTimestamp, getDoc } from 'firebase/firestore';
import CryptoJS from 'crypto-js';

const style = {
  message: `flex items-center shadow-xl m-4 py-2 px-3 rounded-tl-full rounded-tr-full`,
  name: `absolute mt-[-4rem] text-gray-600 text-xs`,
  sent: `bg-[#395dff] text-white flex-row-reverse text-end float-right rounded-bl-full`,
  received: `bg-[#e5e5ea] text-black float-left rounded-br-full text-left`,
  writer: `text-black-600 text-xs`,
  link: `text-white-600 hover:text-blue-800 underline-none cursor-pointer`,
  deleteButton: `text-red-500 ml-2 cursor-pointer`,
  reportButton: `text-yellow-500 ml-2 cursor-pointer`,
};

const Message = ({ message, onDelete, onReport, encryptionKey, currentChatId }) => {

  const [userProfilePhotoUrl, setUserProfilePhotoUrl] = useState('');
  // Clase de mensaje según si es enviado o recibido

  useEffect(() => {
    const fetchUserProfilePhoto = async () => {
      try {
        const userRef = doc(db, 'users', message.name); // Buscar el documento por nombre de usuario
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserProfilePhotoUrl(userData.photoUrl || '');
        }
      } catch (error) {
        console.error('Error fetching user profile photo:', error);
      }
    };

    fetchUserProfilePhoto();
  }, [message.name]);


  const messageClass =
    message.uid === auth.currentUser.uid ? `${style.sent}` : `${style.received}`;

  // Check if the message has a URL
  const hasURL =
    message.hasOwnProperty('url') &&
    (message.url.startsWith('http://') || message.url.startsWith('https://'));

  // Función para encriptar el texto del mensaje
  const encryptText = (text) => {
    try {
      const encryptedText = CryptoJS.AES.encrypt(text, encryptionKey).toString();
      return encryptedText;
    } catch (error) {
      console.error('Error encrypting text:', error);
      return '';
    }
  };

  // Función para reportar un mensaje
  const handleReportMessage = async () => {
    try {
      // Encriptar el texto del mensaje antes de guardarlo en la colección "reported messages"
      const encryptedText = encryptText(message.text);

      // Agregar el mensaje y su información encriptada a la colección "reported messages"
      await addDoc(collection(db, 'reported messages'), {
        name: message.name,
        text: encryptedText, // Guardar el texto encriptado en lugar del texto original
        timestamp: serverTimestamp(),
        // Agrega otros campos relevantes del mensaje si es necesario
      });

      // Llamar a la función onReport para que se realicen otras acciones necesarias
      onReport(message.name);

      await updateDoc(doc(db, currentChatId, message.id), {
        reported: true,
      });

      console.log('Mensaje reportado con éxito.');
    } catch (error) {
      console.error('Error al reportar el mensaje:', error);
    }
  };

  return (
    <div>
      <div
        className={`${style.message} ${messageClass}`}
        style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', wordBreak: 'break-all', maxWidth: '45ch' }}
      >
        

        {hasURL ? (
          <div className={style.writer}>
            <div className={style.profileImage}>
              <img src={message.photoUrl } alt = "Profile" title={message.name} className="rounded-full w-8 h-8 mr-2" />
            </div>
            <a href={message.url} target="_blank" rel="noopener noreferrer" className={style.link}>
              {message.text}
            </a>
          </div>
        ) : (
          <div className={style.writer}>
            <div className={style.profileImage}>
              <img src={message.photoUrl } alt = "Profile" title={message.name} className="rounded-full w-8 h-8 mr-2" />
            </div>
            <p>{message.text}</p>
          </div>
        )}

        {message.uid === auth.currentUser.uid && (
          <span onClick={() => onDelete(message.id)} className={style.deleteButton}>
            🗑️
          </span>
        )}

        {message.uid !== auth.currentUser.uid && (
          <span onClick={handleReportMessage} className={style.reportButton}>
            🚩
          </span>
        )}
      </div>
    </div>
  );
};

export default Message;
*/