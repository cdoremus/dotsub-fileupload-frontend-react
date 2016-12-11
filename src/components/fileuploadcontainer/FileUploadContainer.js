import React, { Component } from 'react';
import FileUploadService from '../fileupload/FileUploadService';
import FileUpload from '../fileupload/FileUpload';
import FileDataTable from '../filedatatable/FileDataTable';
import MessageComponent from '../message/MessageComponent';

class FileUploadContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileDataList: [],
      hasUploadedFile: false,
      message: '',
      currentFileData: {
          id: undefined,
          title: '',
          description: '',
          filename: '',
          createdDate: ''
        }
    }
    this.findAllMetatdataSubscription = undefined;
    this.uploadFileSubscription = undefined;
    this.fileUploadService = new FileUploadService();
    this.findAllMetatdata();
  }


  componentWillUnmount() {
    if (this.submitFileMetadataSubscription) {
      this.submitFileMetadataSubscription.unsubscribe();
    }
    if (this.uploadFileSubscription) {
      this.uploadFileSubscription.unsubscribe();
    }
  }

  render() {
    return (
      <div>
        <MessageComponent message={this.state.message}/>
        <FileUpload hasUploadedFile={this.state.hasUploadedFile}
          currentFileData={ this.state.currentFileData}
          fileUploadCompleted={(file) => this.fileUploadCompleted(file)}
          metadataFormSubmitted={(file) => this.metadataFormSubmitted(file)}
          messageNotification={(message) => this.messageNotification(message)}
        />
        <FileDataTable fileDataList={this.state.fileDataList} />
      </div>
    );
  }

  findAllMetatdata() {
    this.findAllMetatdataSubscription = this.fileUploadService.findAllMetadata()
      .subscribe( resp => {
        let fileData = resp.data;
        console.log('FileUploadContainer.findAllMetatdata() all metatdata found', fileData);
        this.setState({fileDataList: fileData});
        console.log('FileUploadContainer.findAllMetatdata() state.fileDataList', this.state.fileDataList);
      },
      error => {
        console.log('Error finding all file records', error);
        this.setState({message: this._parseErrorMessage(`Error finding all uploaded file records:`, error)});
      });
  }

  fileUploadCompleted(file) {
    this.uploadFileSubscription = this.fileUploadService.upload(file)
        .subscribe(resp => {
            console.log('File Upload Response: ' , resp.data);
            this.setState({currentFileData: resp.data});
            this.setState({hasUploadedFile: true});
            this.setState({message: `File '${file.name}' uploaded successfully. Please fill in title and description`});
            console.log(`Upload file message: ${this.state.message}`);
        },
        error => {
            console.log('Error uploading file file metatdata', error);
            this.setState({message: this._parseErrorMessage(`Error uploading file ${file.name} with size ${file.size}:`, error)});
        });

  }

  metadataFormSubmitted(fileData) {
    this.setState({currentFileData: fileData});
    this.submitFileMetadataSubscription = this.fileUploadService.saveFileMetadata(fileData)
      .subscribe( (resp) => {
        let file = resp.data;
          console.log('FileUploadContainer.submitFileMetadata() file metadata: ', file.filename);
          // file holds FileData component including data added on back end
          this.setState({ message: `File '${file.filename}' data record submitted successfully.`});
          this.setState({hasUploadedFile: false});
          this.findAllMetatdata();
      },
      error => {
          console.log(`Error submitting file metatdata for for ${this.state.currentFileData.filename}`, error);
          this.setState({message: this._parseErrorMessage(`Error submitting file metatdata record for ${this.state.currentFileData.filename}:`, error)});
      }) ;

  }

  messageNotification(message) {
    this.setState({message: message});
  }

  _parseErrorMessage(message, error) {
      try { // try to parse out message
        // console.log('Body of error message to parse: ', error);
        let msg = `${message}`;
        if (error._body) {
          let json = JSON.parse(error._body);
          console.log('Error body parsed', json);
          msg = `${msg}: ${json.message}`;
          console.log(`Parsed message returned: ${msg}`);
        }
        return msg ;
      } catch (e) {
        console.log(`Problem parsing error message`, e);
        return `Error finding all uploaded file records`;
      }

  }

}

export default FileUploadContainer;