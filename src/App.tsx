import React from 'react';
import './App.scss';
import { LoadState, MessageType } from './models';
import { Issue } from './models/issue.model';

function App() {
  const [loadState, setLoadState] = React.useState<LoadState>(LoadState.Pending);
  const [issues, setIssues] = React.useState<Issue[]>([]);

  React.useEffect(() => {

    const loadIssues = async () => {
      setLoadState(LoadState.Loading);

      const tabs = await chrome.tabs.query({ active: true, currentWindow: true});
      const activeTab = tabs?.find(t => t.active);

      if(!!activeTab) {
        const issues: Issue[] = await chrome.tabs.sendMessage(activeTab.id ?? 0, { type: MessageType.GetIssues, data: null})
        setIssues(issues);
      }

      setLoadState(LoadState.Loaded);
    }
    
    if(loadState === LoadState.Pending) {
      loadIssues();
    }
    
  }, [loadState])
  
  return (
    <div className="App">
      {issues?.map(i => (
        <h3>{i.id}</h3>
      ))}
    </div>
  );
}

export default App;
