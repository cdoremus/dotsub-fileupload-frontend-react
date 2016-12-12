import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import FileDataTable from './FileDataTable'

describe('FileDataTable', ()=>{
  beforeEach((done)=>{
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000; // 10 second timeout
    done()
  })
    it('should contain fileDataList prop', (done)=>{
      // given
      let fileList = [{id:1, title: 'title1', description: 'desc1', filename: 'file1.png', createDate: '2016/10/01'}];

      // when
      const table = TestUtils.renderIntoDocument(
        <FileDataTable fileDataList={fileList} />);
      let fileListProp = table.props.fileDataList;

      // then
      expect(fileListProp).toBeDefined();
      expect(fileListProp[0].title).toEqual('title1');

      done()
    })
    it('should contain two table row', (done)=>{
      // given
      let fileList = [{id:1, title: 'title1', description: 'desc1', filename: 'file1.png', createDate: '2016/10/01'}];

      // when
      const table = TestUtils.renderIntoDocument(
        <FileDataTable fileDataList={fileList} />);
      let trs = TestUtils.scryRenderedDOMComponentsWithTag(table, 'tr');

      // then
      // one row for the headers and the other for the data row
      expect(trs.length).toBe(2);

      done()
    })
  afterEach((done)=>{
    done()
  })
})
