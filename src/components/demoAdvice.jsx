import React, { useState } from 'react';

//modal de aviso de demo
const DemoAdviceModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button onClick={handleOpen}>Show Demo Advice</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Demo Advice</h2>
            <p>Página en versión demo, contacta con soporte para más información.</p>
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default DemoAdviceModal;
