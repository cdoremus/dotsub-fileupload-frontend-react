import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import FileUpload from './FileUpload'

describe('FileUpload', ()=>{
  beforeEach((done)=>{
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000; // 10 second timeout
    done()
  })
    it('should contain currentFileData prop containing value of passed in data', (done) => {
      // given
      let file = {id:1, title: 'title1', description: 'desc1', filename: 'file1.png', createDate: '2016/10/01'};

      // when
      const comp = TestUtils.renderIntoDocument(
        <FileUpload currentFileData={file}
          hasUploadedFile={false}
          emitMetatdata={(done) => done()}
          fileUploadCompleted={(done) => done()}
          metadataFormSubmitted={(done) => done()}
          messageNotification={(done) => done()}
          />);
      let fileProp = comp.props.currentFileData;

      // then
      expect(fileProp).toBeDefined();
      expect(fileProp).toEqual(file);
      done();
    })

    it('should contain 7 inputs when hasUploadedFile=true', (done) => {
      // given
      let file = {id:1, title: 'title1', description: 'desc1', filename: 'file1.png', createDate: '2016/10/01'};

      // when
      const comp = TestUtils.renderIntoDocument(
        <FileUpload currentFileData={file}
          hasUploadedFile={true}
          emitMetatdata={(done) => done()}
          fileUploadCompleted={(done) => done()}
          metadataFormSubmitted={(done) => done()}
          messageNotification={(done) => done()}
          />);
      let inputs = TestUtils.scryRenderedDOMComponentsWithTag(comp, 'input');

      // then
      expect(inputs.length).toEqual(7);
      done();
    })

  afterEach((done)=>{
    done()
  })
})