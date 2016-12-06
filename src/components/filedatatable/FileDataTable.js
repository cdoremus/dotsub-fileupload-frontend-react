import React, {Component} from 'react';

class FileDataTable extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    console.log('FileDataTable.render() called');
    let table = null;
    let fileDataList = this.props.fileDataList;
    if (fileDataList && fileDataList.length > 0) {
      let rows = [];
      fileDataList.forEach((file) => {
          rows.push(<tr key={file.id}>
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
              <tbody>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Uploaded File <span id="download-message">Click to download</span></th>
                    <th>Creation Date</th>
                </tr>
                  { rows }
                </tbody>
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
