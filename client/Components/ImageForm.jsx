import React, { useState } from 'react';

const ImageForm = () => {
  const [imageUrl, setImageUrl] = useState('');

  const onChange = (event) => {
    const file = event.target.files[0];

    // You could use the following code to upload the image to a server and get the image URL
    const formData = new FormData();
    formData.append('file', file);

    fetch('/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.url);
      });
  };

  return (
    <div>
      <input type='file' onChange={onChange} />
      {imageUrl && <p>{imageUrl}</p>}
    </div>
  );
};

export default ImageForm;
