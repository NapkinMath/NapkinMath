import axios from 'axios';
import React, { useState } from 'react';

const ImageForm = () => {
  const [file, setFile] = useState();

  const send = (event) => {
    const data = new FormData();
    data.append('file', file);

    axios.post('http://localhost:3000/upload', data)
      .then((res) => console.log(res))
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
