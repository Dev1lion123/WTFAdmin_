import React, { useState } from 'react';
import './DragDrop.css';
import { useTranslation } from 'react-i18next';

const DragDropFile = ({ onFileChange }) => {
  const { t } = useTranslation();
//  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState('');
  const inputRef = React.useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    onFileChange(droppedFile); // Передаем выбранный файл обратно в Form
    setFileName(droppedFile.name);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    onFileChange(selectedFile); // Передаем выбранный файл обратно в Form x2
    setFileName(selectedFile.name);
  };

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="element-animation" id="form-file-upload">
      <input 
        ref={inputRef} 
        type="file" 
        id="input-file-upload" 
        multiple={true} 
        onChange={handleFileChange} 
        style={{ 
          opacity: 0, 
          position: 'absolute', 
          zIndex: -1, 
        }} 
      />

      <label htmlFor="input-file-upload" id="label-file-upload" className="upload-label" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        <div>
          <p>{t('post.pic')}</p>
          <button className="upload-button" onClick={handleButtonClick}>
            {t('post.picButton')}
          </button>
        </div>
      </label>
      <input type="text" id="file-name" value={fileName} readOnly />
    </div>
  );
};

export default DragDropFile;
