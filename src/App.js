import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './styles/main.scss';
import Sidebar from './components/Sidebar.js';
import MainBody from './components/MainBody.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleUp, faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons'
import generateRedditUrl from './helpers/generateRedditUrl';
library.add(faAngleUp, faAngleDown, faCheck);

const App = () => {

  const userSubreddits = [
    {
    name: 'AskReddit',
    isStarred: false,
    id: 0,
    isActive: true, 
    },
    {
    name: 'all',
    isStarred: false,
    id: 1,
    isActive: false, 
    },
    {
    name: 'RocketLeague',
    isStarred: false,
    id: 2,
    isActive: false, 
    },
    {
    name: 'pics',
    isStarred: false,
    id: 3,
    isActive: false, 
    },
    {
    name: 'reactjs',
    isStarred: false,
    id: 4,
    isActive: false,
    },
    {
    name: 'videos',
    isStarred: false,
    id: 5,
    isActive: false
    }
  ];
  const initialActiveSub = 'askreddit';
  const initialActiveSubUrl = `https://www.reddit.com/r/${activeSub}/top.json?limit=10&raw_json=1`;

  const [ subreddits, setSubreddits ] = useState(userSubreddits); //addsub
  const [ activeSub, setActiveSub ] = useState(initialActiveSub);
  const [ activeSubUrl, setActiveSubUrl ] = useState(activeSubUrl);


  const handleChangeActiveSub = (subName) => {
    setActiveSub(subName)
  }

  const addSub = (sub) => {
    console.log('Inside addSub !!!!!');
    setSubreddits(...userSubreddits, sub)		
  };
  
  useEffect(() => {
    fetch(
      `https://www.reddit.com/r/${activeSub}/top.json?limit=10&raw_json=1`,
      {
        method: "GET",
        headers: new Headers({
          // Accept: "application/vnd.github.cloak-preview"
        })
      }
    )
      .then(res => res.json())
      .then(response => {
        //setCommitHistory(response.items);
        //setIsLoading(false);
        console.log('RESPONSE!!:::: ', response)
      })
      .catch(error => console.log(error));
  });

  //testing changes
    return (
      <div className={'App theme-wrapper theme-dark'}>
        <Sidebar subreddits={subreddits} activeSub={activeSub} activeSubURL={activeSubUrl} changeActiveSub={handleChangeActiveSub} addSub={addSub}/>
        <MainBody />
      </div>
    );
  }

export default App;
