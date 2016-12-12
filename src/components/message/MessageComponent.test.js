import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import MessageComponent from './MessageComponent'

describe('MessageComponent', ()=>{
  beforeEach((done)=>{
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000; // 10 second timeout
    done();
  })
    it('should contain message prop holding message text', (done)=>{
      let msg = 'Foobar';
      const msgComponent = TestUtils.renderIntoDocument(
        <MessageComponent message={msg} />
      );

      const msgProp = msgComponent.props.message;

      expect(msgProp).toEqual(msg);
      done();
    })
  afterEach((done)=>{
    done()
  })
})