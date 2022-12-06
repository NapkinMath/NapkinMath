// import React from 'react';
// import axios from 'axios';
// import { render, fireEvent, waitFor } from '@testing-library/react';
// import ImageForm from './ImageForm';

jest.mock('axios');

test('submitting the form sends a POST request with the selected file', async () => {
  const { getByLabelText, getByText } = render(<ImageForm />);
  const fileInput = getByLabelText(/file/i);
  const sendButton = getByText(/send/i);

  const mockFile = new File(['content'], 'file.txt', { type: 'text/plain' });

  fireEvent.change(fileInput, { target: { files: [mockFile] } });
  fireEvent.click(sendButton);

  await waitFor(() => expect(axios.post).toHaveBeenCalledWith(
    'http://localhost:3000/upload',
    expect.objectContaining({
      file: mockFile,
    }),
  ));
});
