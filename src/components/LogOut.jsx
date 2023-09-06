import React, { useState } from 'react';
import { auth } from '../firebase';
import InfoTab from "./InfoTab"; // Importa el nuevo componente InfoTab

const style = {
  button: `bg-gray-200 px-4 py-2 hover:bg-gray-100`,
  infoButton: `mr-2` // Agrega una clase de estilo para el margen derecho
};

const LogOut = ({ onSignOut }) => {
  const signOut = () => {
    auth.signOut();
    onSignOut(); // Llama a la función onSignOut después de cerrar la sesión
  };

  // Estado para controlar la visibilidad de la pestaña de información
  const [infoTabVisible, setInfoTabVisible] = useState(false);

  const toggleInfoTab = () => {
    setInfoTabVisible(!infoTabVisible);
  };

  return (
    <>
    <button onClick={toggleInfoTab} className={`${style.button} ${style.infoButton}`}>
      Info
    </button>
    <button onClick={signOut} className={style.button}>
      Logout
    </button>
    {infoTabVisible && <InfoTab onClose={toggleInfoTab} />}
    </>
  );
};

export default LogOut;


/*
import React from 'react';
import { auth } from '../firebase';

const style = {
  button: `bg-gray-200 px-4 py-2 hover:bg-gray-100`
};

const LogOut = ({ onSignOut }) => {
  const signOut = () => {
    auth.signOut();
    onSignOut(); // Llama a la función onSignOut después de cerrar la sesión
  };

  return (
    <>
    <button onClick={signOut} className={style.button}>
      Logout
    </button>
    </>
  );
};

export default LogOut;
*/