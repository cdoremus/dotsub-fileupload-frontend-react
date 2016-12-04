import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FileUpload from './components/fileupload/FileUpload';
import FileDataTable from './components/filedatatable/FileDataTable';

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
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <FileUpload emitMetatdata={this.uploadedFileRecordsChanged}/>
        <FileDataTable fileDataList={this.state.fileDataList} />
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
