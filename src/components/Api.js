const axios = require('axios');

const uploadPhoto = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post('/api/uploadPhoto', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Photo uploaded:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error uploading photo:', error.message);
    throw error;
  }
};

const sendData = async (data) => {
  try {
    const response = await axios.post('/api/addData', data);

    console.log('Data submitted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error submitting data:', error.message);
    throw error;
  }
};

module.exports = { uploadPhoto, sendData }; 
