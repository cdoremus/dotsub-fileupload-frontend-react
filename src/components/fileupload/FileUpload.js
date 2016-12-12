import React, {Component} from 'react';

class FileUpload extends Component {

  constructor(props) {
    super(props)
    this.fileUploadCompleted = this.props.fileUploadCompleted;
    this.metadataFormSubmitted = this.props.metadataFormSubmitted;
    this.messageNotification = this.props.messageNotification;

    this.state = {
      currentFileData: {
          id: this.props.id,
          title: this.props.title,
          description: this.props.description,
          filename: this.props.filename,
          createDate: this.props.createDate
        },
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('FileUpload.componentWillReceiveProps() props', nextProps);
    this.setState({currentFileData: nextProps.currentFileData});
  }

  render() {
    let formDiv;
    if (this.props.hasUploadedFile) {
       formDiv =  <div><form id="upload-form" onSubmit={ (event) => this.submitFileMetadata(event) } noValidate>
          <div id="upload-data-container">
            <label className="control-label label-title">Please Enter and Submit File Title and Description</label>
            <div className="form-group fieldset">
              <input type="hidden" name="id" value={ this.state.currentFileData.id} />
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
        { formDiv }
      </div>
    );
  }

  submitFileMetadata(event) {
    console.log('Submitted data', event);
    // console.log('Submitted data value', event.target.value);
    console.log('Current state:', this.state);

    // for react
    if (event) {
      event.preventDefault();
    }
    let fileData = this.state.currentFileData;
    // validate that title and description are filled in
    if (!fileData.title || !fileData.description) {
        let message = 'Title and Description are required';
        this.messageNotification(message);
        return;
    }
    this.metadataFormSubmitted(fileData);
  }

  metadataFormSubmitted(fileData) {
    return fileData;
  }

   uploadFile(fileInput) {
        console.log('FileUpload.uploadFile() file selected: ', fileInput);
        // console.log('FileUpload.uploadFile() file selected value: ', fileInput.target.value);
        let files = fileInput.target.files;
        console.log('FileUpload.uploadFile() file selected array: ', files);

        if (files && files.length > 0) {
            let file = files[0];
            // validate size < 2MB
            if (file.size > 2000000) {
                let message = `Size of file ${file.name} is too large. Please select a file less than 2MB.`;
                this.messageNotification(message);
                return;
            }
            this.fileUploadCompleted(file);
        } else {
            let message = 'No upload files available';
            this.messageNotification(message);
        }
    }

  fileUploadCompleted(fileData) {
    return fileData;
  }

  messageNotification(message) {
    return message;
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
