import React from 'react';

const OCRTestBasic: React.FC = () => {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#00ff00',
      border: '5px solid #ff0000',
      margin: '20px',
      textAlign: 'center',
      fontSize: '24px',
      color: '#000'
    }}>
      <h1>🎉 ÇA MARCHE ! 🎉</h1>
      <p>Le menu OCR + IA fonctionne parfaitement !</p>
      <p>Branche: feature/remove-api-deployment-tabs</p>
      <p>Date: {new Date().toLocaleString()}</p>
    </div>
  );
};

export default OCRTestBasic;