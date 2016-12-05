import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import FileUpload from './components/fileupload/FileUpload';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fileDataList:  [],
      fileListListener: null
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <header>
          <img src={logo} alt="logo" />
        </header>
        <main>
          <h3>React File Upload Form with Spring Rest Controller Back End</h3>
          <FileUpload emitMetatdata={this.uploadedFileRecordsChanged}/>
        </main>
        <footer>
          <hr/>
          <a href="https://dotsub.com">Dotsub</a> <span>- the leading way to caption and translate videos online - is not affiliated with this web site.</span>
          <hr/>
        </footer>
      </div>
    );
  }

  uploadedFileRecordsChanged(event) {
    console.log('App.uploadedFileRecords() called with event: ', event);
    this.setState({fileDataList: event});
    console.log('FileDataList in App', this.state.fileDataList);
  }
}

export default App;
