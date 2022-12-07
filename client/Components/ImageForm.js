import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ImageForm = () => {
  const location = useLocation();
  const userData = location.state
  // console.log(userData)
  const navigate = useNavigate();
  const [file, setFile] = useState();

  const send = (event) => {
    const data = new FormData();
    data.append('file', file);

    axios.post('http://localhost:3000/upload', data)
      .then((res) => navigate('/ItemSelector', {state: {imageData: res.data, userData: userData}}))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form action="#" method="post" encType="multipart/form-data">
        <div className="flex">
          <label htmlFor="file">File</label>
          <input
            type="file"
            id="file"
            onChange={(event) => {
              const file = event.target.files[0];
              setFile(file);
            }}
          />
        </div>
      </form>
      <button onClick={send}>Send</button>
    </div>
  );
};

export default ImageForm;
