import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FileUpload from './components/fileupload/FileUpload';
import FileDataTable from './components/filedatatable/FileDataTable';
import Rx from 'rxjs';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fileDataList:  [],
      fileListListener: null
    }
    // this.fileListSubject = new Rx.Subject();
    // this.setState({fileListListener: this.fileListSubject.subscribe((fileList) => {
    //   this.setState({fileDataList: fileList});
    // })});
  }

  componentDidMount() {
    // this.state.fileListListener = this.state.fileListSubject.subscribe((fileList) => {
    //   this.setState({fileDataList: fileList});
    // });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <FileUpload emitMetatdata={this.uploadedFileRecordsChanged}/>
        <FileDataTable fileDataList={this.state.fileDataList}/>
      </div>
    );
  }

  uploadedFileRecordsChanged(event) {
    console.log('App.uploadedFileRecords() called with event: ', event);
    // if (!this.fileListSubject) {
    //   this.fileListSubject = new Rx.BehaviorSubject(event);
    //   this.setState({fileListListener: this.fileListSubject.subscribe((fileList) => {
    //     this.setState({fileDataList: fileList});
    //   })});
    // } else {
    //   this.fileListSubject.next(event);
    // }
    console.log('FileDataList in App', this.state.fileDataList);
  }
}

export default App;
