import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { DOMMessage, DOMMessageResponse } from './models';

function App() {

  const [title, setTitle] = React.useState('');
  // const [headlines, setHeadlines] = React.useState<string[]>([]);

  React.useEffect(() => {
    /**
     * We can't use "chrome.runtime.sendMessage" for sending messages from React.
     * For sending messages from React we need to specify which tab to send it to.
     */
    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      /**
       * Sends a single message to the content script(s) in the specified tab,
       * with an optional callback to run when a response is sent back.
       *
       * The runtime.onMessage event is fired in each content script running
       * in the specified tab for the current extension.
       */
      chrome.tabs.sendMessage(
        tabs[0].id || 0,
        { type: 'GET_DOM' } as DOMMessage,
        (response: DOMMessageResponse) => {
          if(response?.title) {
            setTitle(response.title);
          } else {
            setTitle('No Title')
          }
        });
    });

    chrome.action.onClicked.addListener((tab) => console.log(tab));
  });
  
  return (
    <div className="App">
      <h1>{title}</h1>
    </div>
  );
}

export default App;
