import React, { Component } from 'react';
import ImageForm from './Components/ImageForm.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='app'>
        <h1 id='title'>Napkin math!</h1>
        <ImageForm />
      </div>
    );
  }
}

export default App;
