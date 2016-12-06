import React, {Component} from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
import FileUploadService from './FileUploadService';
import FileDataTable from '../filedatatable/FileDataTable';

class FileUpload extends Component {

  constructor(props) {
    super(props)
    this.emitMetatdata = this.props.emitMetatdata;

    this.state = {
      message: '',
      currentFileData: {
          id: undefined,
          title: '',
          description: '',
          filename: '',
          createdDate: ''
        },
      fileDataList: [],
      hasUploadedFile: false
    }
    this.submitFileMetadataSubscription = undefined;
    this.findAllMetatdataSubscription = undefined;
    this.uploadService = new FileUploadService();
  }

  componentWillMount() {
    this.findAllMetatdata();
  }

  componentWillUnmount() {
    if (this.submitFileMetadataSubscription) {
      this.submitFileMetadataSubscription.unsubscribe();
    }
    if (this.this.findAllMetatdataSubscription) {
      this.this.findAllMetatdataSubscription.unsubscribe();
    }
  }

  render() {
    console.log('FileUpload.render() called');
    // console.log('FileUpload.render() state.fileDataList', this.state.fileDataList)
    let msgDiv = '';
    if (this.state.message) {
      msgDiv = <div>
        <div id="uploadMessage">{ this.state.message }</div>
      </div>
    }
    let formDiv;
    if (this.state.hasUploadedFile) {
       formDiv =  <div><form id="upload-form" onSubmit={ (event) => this.submitFileMetadata(event) } noValidate>
          <div id="upload-data-container">
            <label className="control-label label-title">Please Enter and Submit File Title and Description</label>
            <div className="form-group fieldset">
              <input type="hidden" name="id" onChange={ (event) => this.setState({currentFileData: {id: event.target.value}}) } value={ this.state.currentFileData.id} />
              <label className="control-label">Record ID</label>
              <input type="text" className="form-control"  name="displayId" value={ this.state.currentFileData.id } disabled="true" />
            </div>
            { /* TODO: Need to dynamically add like NG2: [className.has-error]="title.invalid && title.touched" */ }
            <div className="form-group fieldset">
              <label id="title-label" className="control-label form-label">Title</label>
              <input type="text" className="form-control" name="title"  onChange={ (event) => this.setState({ currentFileData: Object.assign({}, this.state.currentFileData, {title: event.target.value})}) } value={ this.state.currentFileData.title }
                placeholder="Enter Title" required/>
                { /* TODO:
              <div *ngIf="title.invalid && title.touched" className="alert alert-danger">
                      Title is required.
              </div>
              */ }
            </div>
            { /* TODO: Need to dynamically add like NG2:  [className.has-error]="description.invalid && description.touched" */}
            <div className="form-group fieldset">
              <label className="control-label">Description</label>
              <input type="text" className="form-control" name="description"  onChange={ (event) => this.setState({ currentFileData: Object.assign({}, this.state.currentFileData, {description: event.target.value})}) } value={ this.state.currentFileData.description }
                  placeholder="Enter Description" required/>
                { /* TODO:
              <div *ngIf="description.invalid && description.touched" className="alert alert-danger">
                        Description is required.
              </div>
              */ }
            </div>
            <div className="form-group fieldset">
              <label className="control-label">File name</label>
              <input type="text" className="form-control"
                name="filename" value={ this.state.currentFileData.filename } disabled="true"/>
            </div>
            <div className="form-group fieldset">
              <label className="control-label">Creation date</label>
              <input type="text" className="form-control"
                name="createDate" value={ this.state.currentFileData.createDate}  disabled="true"/>
            </div>
            <input type="submit"  className="btn btn-primary" value="Submit"/>
          </div>
          </form>
          </div>
    } else {
      formDiv = <div><label className="control-label label-title">Please Choose a File to Upload</label>
          <div className="form-group fieldset">
            <input type="file"  className="form-control" name="uploadedFile" onChange={ (event) => this.uploadFile(event) } />
          </div>
          </div>
    }

    return (
      <div id="form-container">
        { msgDiv }
        { formDiv }
      </div>

    );
  }

  submitFileMetadata(event) {
    console.log('Submitted data', event);
    console.log('Submitted data value', event.target.value);
    console.log('Current state:', this.state);

    // for react
    if (event) {
      event.preventDefault();
    }
    // validate that title and description are filled in
    if (!this.state.currentFileData.title || !this.state.currentFileData.description) {
        this.setState({message: 'Title and Description are required'});
        return;
    }
    this.submitFileMetadataSubscription = this.uploadService.saveFileMetadata(this.state.currentFileData)
      .subscribe( (resp) => {
        let file = resp.data;
          console.log('FileUpload.submitFileMetadata() file metadata: ', file.filename);
          // file holds FileData component including data added on back end
          this.setState({ message: `File '${file.filename}' data record submitted successfully.`});
          this.findAllMetatdata();
          this.emitMetatdata(this.state.fileDataList);
      },
      error => {
          console.log(`Error submitting file metatdata for for ${this.state.currentFileData.filename}`, error);
          this.setState({message: this._parseErrorMessage(`Error submitting file metatdata record for ${this.state.currentFileData.filename}:`, error)});
      }) ;
      // ,
      // // on completion, refresh metatdata list
      // () => this.findAllMetatdata());
  }

  findAllMetatdata() {
    this.findAllMetatdataSubscription = this.uploadService.findAllMetadata()
      .subscribe( resp => {
        let fileData = resp.data;
        console.log('FileUpload.findAllMetatdata() all metatdata found', fileData);
        this.setState({fileDataList: fileData});
        console.log('FileUpload.findAllMetatdata() state.fileDataList', this.state.fileDataList);
        this.emitMetatdata(fileData);
      },
      error => {
          console.log('Error finding all file records', error);
          this.message = this._parseErrorMessage(`Error finding all uploaded file records:`, error);
      });
  }

  emitMetatdata(metadata) {
    return metadata;
  }

   uploadFile(fileInput) {
        console.log('FileUpload.uploadFile() file selected: ', fileInput);
        console.log('FileUpload.uploadFile() file selected value: ', fileInput.target.value);
        let files = fileInput.target.files;
        console.log('FileUpload.uploadFile() file selected array: ', files);

        if (files && files.length > 0) {
            let file = files[0];
            // validate size < 2MB
            if (file.size > 2000000) {
                this.setState({message: `Size of file ${file.name} is too large. Please select a file less than 2MB.`});
                return;
            }
            this.uploadFileSubscription = this.uploadService.upload(file)
                .subscribe(resp => {
                    console.log('FIle Upload Response: ' , resp.data);
                    this.setState({currentFileData: resp.data});
                    this.setState({hasUploadedFile: true});
                    this.setState({message: `File '${file.name}' uploaded successfully. Please fill in title and description`});
                    console.log(`Upload file message: ${this.state.message}`);
                },
                error => {
                    console.log('Error uploading file file metatdata', error);
                    this.setState({message: this._parseErrorMessage(`Error uploading file ${file.name} with size ${file.size}:`, error)});
                });
        } else {
            this.setState({message: 'No upload files available'});
            console.log(this.state.message);
        }
    }

    _parseErrorMessage(message, error) {
        try { // try to parse out message
            let json = JSON.parse(error._body);
            console.log('Error body parsed', json);
            let msg = `${message}: ${json.message}`;
            console.log(`Parsed message returned: ${msg}`);
            return msg ;
        } catch (e) {
            console.log(`Problem parsing error message`, e);
            return `Error finding all uploaded file records`;
        }

    }
}


export default FileUpload;
