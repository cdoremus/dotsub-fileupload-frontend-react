import React, {Component} from 'react';

class FileDataTable extends Component {

  constructor(props) {
    super(props)
    // this.props.updateFileDataList = this.updateFileDataList;
    this.state = {
      fileDataList: [],
    }
  }

  componentDidMount() {
    console.log('FileDataTable.componentDidMount() this.state.fileDataList', this.state.fileDataList)
    this.updateFileDataList(this.props.fileDataList);
    // this.setState({fileDataList: this.props.fileDataList});
  }

  componentDidUpdate(props, state) {
    console.log('FileDataTable.componentDidUpdate() with props', props);
    console.log('FileDataTable.componentDidUpdate() with state', state);
  }

  updateFileDataList(fileDataList) {
    this.setState({fileDataList: fileDataList});
  }

  render() {
    console.log('FileDataTable.render() called');
    console.log('FileDataTable.render() state.fileDataList', this.state.fileDataList)
    let table = null;
    let fileDataList = this.state.fileDataList;
    if (fileDataList && fileDataList.length > 0) {
      let rows = [];
      fileDataList.forEach((file) => {
          rows.push(<tr>
            <td> {file.id} </td>
            <td> {file.title} </td>
            <td> {file.description} </td>
            <td> <a href={`http://localhost:8080/uploadservice/files/${file.filename}`}>{ file.filename }</a> </td>
            <td> {file.createDate} </td>
          </tr>)
        }
      )

      table =<div><div className="filedatatable">
        <div className="table-legend">Uploaded Files</div>
        <div className="table-container">
            <table className="centerTable">
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Uploaded File <span id="download-message">Click to download</span></th>
                    <th>Creation Date</th>
                </tr>
                { rows }
          </table>
        </div>
        </div>
        </div>
      } else {
        table = <span>No Metatdata available</span>
      }

    return ( table );
  }
}

export default FileDataTable;
