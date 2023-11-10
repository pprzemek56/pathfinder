import React from 'react';
import './Popup.css';

const Popup = ({ message, onClose }) => {
  return (
    <>
      <div className="popup-overlay" onClick={onClose}></div>
      <div className="popup-window">
        <div className="popup-content">
          <p>{message}</p>
          <button onClick={onClose} className="confirm-button">CONFIRM</button>
        </div>
      </div>
    </>
  );
};

export default Popup;