import React from "react";

const style = {
  infoTab: `bg-white border rounded-lg p-4 shadow-md absolute top-16 right-4 z-10`,
  closeButton: `text-gray-500 hover:text-gray-700 absolute top-1 right-2 cursor-pointer`
};

const InfoTab = ({ onClose }) => {
  return (
    <div className={style.infoTab}>
      <span onClick={onClose} className={style.closeButton}>
        X
      </span>
      <p>🗑️  -->  Borrar Mensaje </p>
      <p>🚩  -->  Reportar Mensaje y Usuario</p>
    </div>
  );
};

export default InfoTab;
