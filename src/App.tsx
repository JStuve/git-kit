import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { LocalStorageToken } from './models';

function App() {

  const [author, _] = React.useState(localStorage.getItem(LocalStorageToken.GitAuthor));
  const [repo, _] = React.useState(localStorage.getItem(LocalStorageToken.GitRepo));
  // const [headlines, setHeadlines] = React.useState<string[]>([]);

  
  return (
    <div className="App">
      <h1>{githubAuthor}/{githubRepo}</h1>
    </div>
  );
}

export default App;
