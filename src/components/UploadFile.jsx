import React, { useEffect, useRef, useState } from 'react';
import { auth } from '../firebase';
import { app } from '../firebase';
import { serverTimestamp } from 'firebase/firestore';
import CryptoJS from 'crypto-js';

const style = {
  form: `h-14 w-full max-w-[928px] flex text-xl absolute bottom-0 position: sticky`,
  input: `w-full text-xl p-3 bg-gray-900 text-white outline-none border-none`,
  button: `w-[20%] bg-green-500`,
};

function UploadFile({ currentChatId, encryptionKey }) {
  const [archivoUrl, setArchivoUrl] = useState('');
  const [nombrearchivo, setNombreArchivo] = useState('');
  const [docus, setDocus] = useState([]);
  const fileInputRef = useRef(null);
  const archivoHandler = async (e) => {
    const archivo = e.target.files[0];
    const storageRef = app.storage().ref();
    const archivoPath = storageRef.child(archivo.name);
    await archivoPath.put(archivo);
    console.log('archivo cargado:', archivo.name);
    const enlaceUrl = await archivoPath.getDownloadURL();
    setArchivoUrl(enlaceUrl);
    setNombreArchivo(archivo.name);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (archivoUrl === '') {
      alert('Selecciona un archivo');
      return;
    }
    // Encripta el nombre del archivo utilizando la clave de encriptación
    const encryptedFileName = encryptText(nombrearchivo);
    const coleccionRef = app.firestore().collection(currentChatId);
    const { uid, displayName, photoURL } = auth.currentUser;
    const docu = await coleccionRef.doc().set({
      name: displayName,
      text: encryptedFileName, // Utiliza el nombre de archivo encriptado
      timestamp: serverTimestamp(),
      uid,
      url: archivoUrl,
      photoUrl: photoURL, 
    });
    fileInputRef.current.value = '';
    setArchivoUrl(''); // Limpiar el valor del estado archivoUrl
  };

  useEffect(() => {
    fileInputRef.current.value = '';
    setArchivoUrl(''); // Limpiar el valor del estado archivoUrl cuando currentChatId cambia
  }, [currentChatId]);

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
    <>
      <form onSubmit={submitHandler} className={style.form} style={{ flex: 1 }}>
        <input type="file" onChange={archivoHandler} ref={fileInputRef} className={style.input} />
        <button className={style.button}>Enviar</button>
      </form>
    </>
  );
}

export default UploadFile;


/*import React, { useEffect, useRef, useState } from 'react';
import { auth } from '../firebase';
import { app } from '../firebase';
import { serverTimestamp } from 'firebase/firestore';

const style = {
  form: `h-14 w-full max-w-[928px] flex text-xl absolute bottom-0 position: sticky`,
  input: `w-full text-xl p-3 bg-gray-900 text-white outline-none border-none`,
  button: `w-[20%] bg-green-500`,
};

function UploadFile({ currentChatId }) {
  const [archivoUrl, setArchivoUrl] = useState('');
  const [nombrearchivo, setNombreArchivo] = useState('');
  const [docus, setDocus] = useState([]);
  const fileInputRef = useRef(null);

  const archivoHandler = async (e) => {
    const archivo = e.target.files[0];
    const storageRef = app.storage().ref();
    const archivoPath = storageRef.child(archivo.name);
    await archivoPath.put(archivo);
    console.log('archivo cargado:', archivo.name);
    const enlaceUrl = await archivoPath.getDownloadURL();
    setArchivoUrl(enlaceUrl);
    setNombreArchivo(archivo.name);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (archivoUrl === '') {
      alert('Selecciona un archivo');
      return;
    }
    const coleccionRef = app.firestore().collection(currentChatId);
    const { uid, displayName } = auth.currentUser;
    const docu = await coleccionRef.doc().set({
      name: displayName,
      text: nombrearchivo,
      timestamp: serverTimestamp(),
      uid,
      url: archivoUrl,
    });
    fileInputRef.current.value = '';
    setArchivoUrl(''); // Limpiar el valor del estado archivoUrl
  };

  useEffect(() => {
    fileInputRef.current.value = '';
    setArchivoUrl(''); // Limpiar el valor del estado archivoUrl cuando currentChatId cambia
  }, [currentChatId]);

  return (
    <>
      <form onSubmit={submitHandler} className={style.form}>
        <input type="file" onChange={archivoHandler} ref={fileInputRef} className={style.input} />
        <button className={style.button}>Enviar</button>
      </form>
    </>
  );
}

export default UploadFile;*/