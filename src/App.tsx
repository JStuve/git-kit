import React from 'react';
import { Eye } from 'lucide-react';
import './App.scss';
import { LoadState, MessageType } from './models';
import { Issue } from './models/issue.model';
import Button from './components/Button';

function App() {
  const [loadState, setLoadState] = React.useState<LoadState>(LoadState.Pending);
  const [domIssues, setDomIssues] = React.useState<Issue[]>([]);
  const [hiddenIssues, setHiddenIssues] = React.useState<Issue[]>([]);

  React.useEffect(() => {

    const loadIssues = async () => {
      setLoadState(LoadState.Loading);

      const tabs = await chrome.tabs.query({ active: true, currentWindow: true});
      const activeTab = tabs?.find(t => t.active);

      if(!!activeTab) {
        const domIssues: Issue[] = await chrome.tabs.sendMessage(activeTab.id ?? 0, { type: MessageType.IssueGet, data: null})
        const storedIssues: {[key: string]: Issue } = await chrome.storage.sync.get(domIssues.map(d => d.id));
        const hiddenIssues: Issue[] = Object.values(storedIssues);

        setHiddenIssues(hiddenIssues);
        setDomIssues(domIssues);
      }

      setLoadState(LoadState.Loaded);
    }
    
    if(loadState === LoadState.Pending) {
      loadIssues();
    }
    
  }, [loadState])

  const IssueElement = (issue: Issue) => (
    <div className="issue-container">
      <div className="content-container">
        <h3>{issue.gitHub.title}</h3>
        <span>{"#" + issue.gitHub.issue}</span>
      </div>
      <div className="action-container">
        <Button child={<Eye/>} variant='no-style'/>
      </div>
    </div>
  )
  
  return (
    <div className="app-container">
      <Button child={'Refresh'} click={() => setLoadState(LoadState.Pending)}/>
      <div className='issues-container'>
        {hiddenIssues?.map(i => IssueElement(i))}
      </div>
    </div>
  );
}

export default App;
