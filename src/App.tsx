import React from 'react';
import { Eye, RefreshCcw } from 'lucide-react';
import './App.scss';
import { GithubDetails, GithubTab, LoadState, MessageType } from './models';
import { Issue } from './models/issue.model';
import Button from './components/button/Button';
import clsx from 'clsx';
import { ArrayUtility } from './utilities';
import ReportIssueLink from './components/report-issue-link/ReportIssueLink';
import Loader from './components/loader/Loader';

function App() {
  const [loadState, setLoadState] = React.useState<LoadState>(LoadState.Pending);
  const [domIssues, setDomIssues] = React.useState<Issue[]>([]);
  const [hiddenIssues, setHiddenIssues] = React.useState<Issue[]>([]);
  const [activeTabId, setActiveTabId] = React.useState<number>(0);
  const [repo, setRepo] = React.useState<string>('');
  const [githubDetails, setGithubDetails] = React.useState<GithubDetails>();

  React.useEffect(() => {

    const loadIssues = async () => {
      setLoadState(LoadState.Loading);

      const tabs = await chrome.tabs.query({ active: true, currentWindow: true});
      const activeTab = tabs?.find(t => t.active);

      if(!!activeTab) {
        const domIssues: Issue[] = await chrome.tabs.sendMessage(activeTab.id ?? 0, { type: MessageType.IssueGet, data: null})
        const storedIssues: {[key: string]: Issue } = await chrome.storage.sync.get(domIssues.map(d => d.id));
        const hiddenIssues: Issue[] = ArrayUtility.sortBy<Issue, string>(Object.values(storedIssues).filter(i => i.isVisible === false), i => i.gitHub.issue, true);

        setActiveTabId(activeTab.id ?? 0);
        setHiddenIssues(hiddenIssues);
        setDomIssues(domIssues);
        
        const githubDetails: GithubDetails = await chrome.tabs.sendMessage(activeTab.id ?? 0, { type: MessageType.GithubDetailsGet, data: null})

        setGithubDetails(githubDetails);
        if(githubDetails.author === '') {
          setRepo('')
        } else {
          setRepo(`${githubDetails.author}/${githubDetails.repo}`);
        }
        
      }

      setLoadState(LoadState.Loaded);
    }
    
    if(loadState === LoadState.Pending) {
      loadIssues();
    }
    
  }, [loadState])

  const showIssue = async (issue: Issue) => {
    const updatedIssues: Issue[] = hiddenIssues.filter(h => h.id !== issue.id);
    
    await chrome.tabs.sendMessage(activeTabId, { type: MessageType.IssueShow, data: issue})
    
    setHiddenIssues(updatedIssues);
  }

  const IssueElement = (issue: Issue) => (
    <div className="issue-container">
      <div className="content-container">
        <h3 title={issue.gitHub.title}>{issue.gitHub.title}</h3>
        <span>{"#" + issue.gitHub.issue}</span>
      </div>
      <div className="action-container">
        <Button child={<Eye/>} variant='no-style' click={() => showIssue(issue)} title='Show issue'/>
      </div>
    </div>
  )

  const NoIssuesElement = () => (
    <div className={clsx('issues-none')}>
      <h3>{'All issues are visible'}</h3>
    </div>
  )

  if(githubDetails?.isGithubSite === false) {
    return (
      <div className={clsx('app-site-invalid')}>
        <h3>{'This site is not supported.'}</h3>
        <ReportIssueLink/>
      </div>
    )
  }

  if(githubDetails?.tab !== GithubTab.Issues) {
    return (
      <div className={clsx('app-site-invalid')}>
        <h3>{'This Github tab currently has no features.'}</h3>
        <Button child={'Request feature'} click={() => window.open('https://github.com/JStuve/github-extension/issues', '_blank')} title='Request feature'/>
      </div>
    )
  }
  
  return (
    <div className="app-container">
      <div className={clsx('issues-header')}>
        <div className={clsx('title')}>
          <span className={clsx('title__feature')} title={'Issues'}>{'Issues'}</span>
          <span className={clsx('title__repo')} title={repo}>{repo !== null ? `in @${repo}` : ''}</span>
        </div>
        <Button 
          child={ loadState === LoadState.Loading ? <Loader/> : <RefreshCcw/>} 
          click={() => setLoadState(LoadState.Pending)} 
          title='Refresh issues'
        />
      </div>
      
      <div className='issues-container'>
        {hiddenIssues?.length > 0 ? hiddenIssues?.map(i => IssueElement(i)) : NoIssuesElement()}
      </div>
      <div className={clsx('issues-footer')}>
        <ReportIssueLink/>
      </div>
    </div>
  );
}

export default App;
