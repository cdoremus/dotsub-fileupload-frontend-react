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
    this.updateFileDataList(this.props.fileDataList);
    // this.setState({fileDataList: this.props.fileDataList});
    // console.log('FileDataList in FileDataTable', this.state.fileDataList)
  }

  updateFileDataList(fileDataList) {
    this.setState({fileDataList: fileDataList});
  }

  render() {
    console.log('FileDataTable.render() called');
    console.log('FileDataList in FileDataTable', this.state.fileDataList)
    let table = null;
    let fileDataList = this.state.fileDataList;
    if (fileDataList && fileDataList.length > 0) {
      let rows = [];
      fileDataList.forEach((file) => {
          rows.push(<tr>
            <td> {file.id} </td>
            <td> {file.title} </td>
            <td> {file.description} </td>
            <td> <a href="">{ file.filename }</a> </td>
            <td> {file.createdDate} </td>
          </tr>)
        }
      )

      table = <div>
        <div class="table-legend">Uploaded Files</div>
        <div class="table-container">
            <table class="centerTable">
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
      } else {
        table = <span>No Metatdata available</span>
      }

    return ( table );
  }
}

export default FileDataTable;
