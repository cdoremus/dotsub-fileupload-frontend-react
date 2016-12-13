import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import FileUploadContainer from './components/fileuploadcontainer/FileUploadContainer';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header>
          <img src={logo} alt="logo" />
        </header>
        <main>
          <h3>React File Upload Form with Spring Rest Controller Back End</h3>
          <FileUploadContainer />
        </main>
        <footer>
          <hr/>
          <a href="https://dotsub.com">Dotsub</a> <span>- the leading way to caption and translate videos online - is not affiliated with this web site.</span>
          <hr/>
        </footer>
      </div>
    );
  }
}

export default App;
