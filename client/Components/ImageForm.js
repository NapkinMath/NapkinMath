import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../Styles/ImageForm.css'

const ImageForm = () => {
  const location = useLocation();
  const userData = location.state
  // console.log(userData)
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [imgDisplay, setImageDisplay] = useState();

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
    <div className='flex'>
      <form action="#" method="post" encType="multipart/form-data">
        <div className="flex">
          <label className='instructions' htmlFor="file">Upload your receipt</label>
          <input
            className='button-55'
            type="file"
            id="file"
            onChange={(event) => {
              const file = event.target.files[0];
              setFile(file);
              setImageDisplay(URL.createObjectURL(event.target.files[0]))
            }}
          />
          {imgDisplay ? <img src={imgDisplay} className='imgDisplay' /> : <div></div>}
        </div>
      </form>
      <button className='button-55' onClick={send}>Split Bill</button>
    </div>
  );
};

export default ImageForm;
