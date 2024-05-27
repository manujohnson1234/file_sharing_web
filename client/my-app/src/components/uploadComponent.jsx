import React, { useState } from 'react';
import {uploadFile} from "../services/uploadFileApi"
import "./upload.css"

export  const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle file upload logic here
    console.log(file);
    const data= new FormData();
    data.append('file', file);

    const response = await uploadFile(data);

    alert(response.message);
  };

  return (
    <form onSubmit={handleSubmit} className="file-upload-form">
      <label>
        Upload file:
        <input type="file" onChange={handleFileChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
