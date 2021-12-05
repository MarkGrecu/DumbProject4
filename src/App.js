import logo from './logo.svg';
import './App.css';
import {useEffect, useState } from "react";
import axios from 'axios';
import GistDetails from "./components/details";
import { func } from 'prop-types';

function App() {
  const [username, setUsername] = useState("");
  const [loading, setLoaoding] = useState(false);
  const [repos, setRepos] = useState([]);
  const [details, setDetails] = useState({});
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    setRepos([]);
    setDetails({});
  },[username])

  function handleSubmit(e) {
    e.preventDefault();
    searchRepos();
  }

  function searchRepos() {
    setLoaoding(true);
    
    axios({
      method: "get",
      url: 'https://api.github.com/users/'+username+'/gists',
    }).then(res=> {
    
      setLoaoding(false);
      setRepos(res.data);
    })
  }

  function renderRepo(repo){
    
    return (
      <div className="row" onClick={()=> getDetails(repo.id)} key={repo.id}>
      <h2 className="repo-name">
      {repo.id}
      </h2>
      </div>
    )
  }

  function getDetails(repoName) {
   
    setDetailsLoading(true);
    axios({
      method: "get",
      url: 'https://api.github.com/gists/'+repoName,
    }).then(res =>{
     
      setDetailsLoading(false);
      setDetails(res.data);
    })
  }

  return (
    <div className="page">
      <div className="landing-page-container">
        <div className="left-side">
          <form className="form">
            <input className="input"
              value={username}
              placeholder="GitHub Username"
              onChange={e => setUsername(e.target.value)}>
            </input>
            <button className="button" onClick={handleSubmit}>{loading ? "Searching...": "Search"} </button>
          </form>
          <div className="result-container">
            {repos.map(renderRepo)}
          </div>

        </div>
        <GistDetails details={details} loading={detailsLoading} />
      </div>
    </div>
  );
}

export default App;
