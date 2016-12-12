import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import FileUploadContainer from './FileUploadContainer'

describe('FileUploadContainer', ()=>{
  beforeEach((done)=>{
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000; // 10 second timeout
    done()
  })
    it('should be defined', (done) => {
      // given
      const comp = TestUtils.renderIntoDocument(<FileUploadContainer />)

      // then
      expect(comp).toBeDefined();
      done();
    })

    it('should contain 3 components', (done) => {
      // given
      const comp = TestUtils.renderIntoDocument(<FileUploadContainer />)

      // when
      let msgComp = TestUtils.scryRenderedDOMComponentsWithTag(comp, 'MessageComponent');
      let fileUploadComp = TestUtils.scryRenderedDOMComponentsWithTag(comp, 'FileUpload');
      let fileDataTableComp = TestUtils.scryRenderedDOMComponentsWithTag(comp, 'FileDataTable');

      // then
      expect(msgComp).toBeDefined();
      expect(fileUploadComp).toBeDefined();
      expect(fileDataTableComp).toBeDefined();
      done();
    })

    it('should parse error message', (done) => {
      // given
      const comp = TestUtils.renderIntoDocument(<FileUploadContainer />)
      let message = "Foo issue";
      let errMsg = 'Error in Foo';
      let error = {_body: `{"foo": "fooVal", "message": "${errMsg}"}`};

      // when
      let msg = comp._parseErrorMessage(message, error);

      // then
      expect(msg).toEqual(message + ': ' + errMsg);
      done();
    })

  afterEach((done)=>{
    done()
  })
})
