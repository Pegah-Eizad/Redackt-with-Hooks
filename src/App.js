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

  const initialSubreddits = [
    {
    name: 'AskReddit',
    isStarred: false,
    id: 0
    },
    {
    name: 'all',
    isStarred: false,
    id: 1
    },
    {
    name: 'RocketLeague',
    isStarred: false,
    id: 2
    },
    {
    name: 'pics',
    isStarred: false,
    id: 3
    },
    {
    name: 'reactjs',
    isStarred: false,
    id: 4
    },
    {
    name: 'videos',
    isStarred: false,
    id: 5
    }
  ];
  const initialActiveSub = 'AskReddit';
  const initialActiveSubUrl = 'https://www.reddit.com/r/askreddit/top.json?limit=10&raw_json=1';

  const [ subreddits, setSubreddits ] = useState(initialSubreddits); //addsub
  const [ activeSub, setActiveSub ] = useState(initialActiveSub);
  const [ activeSubUrl, setActiveSubUrl ] = useState(initialActiveSubUrl);


  // setActiveSub = (sub) => {
    
  // }

  const addSub = (sub) => {
    console.log('Inside addSub !!!!!');
		
  };
  
  useEffect(() => {
    fetch(
      'https://www.reddit.com/r/AskReddit/top.json?limit=10&raw_json=1',
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
        <Sidebar subreddits={subreddits} activeSub={activeSub} activeSubURL={activeSubUrl} changeSub={setActiveSub} addSub={addSub}/>
        <MainBody />
      </div>
    );
  }

export default App;
