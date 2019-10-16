import React, { Component } from 'react';
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
    name: "AskReddit",
    isStarred: false,
    id: 0
    },
    {
    name: "all",
    isStarred: false,
    id: 1
    },
    {
    name: "RocketLeague",
    isStarred: false,
    id: 2
    },
    {
    name: "pics",
    isStarred: false,
    id: 3
    },
    {
    name: "reactjs",
    isStarred: false,
    id: 4
    },
    {
    name: "videos",
    isStarred: false,
    id: 5
    }
  ];

  const [ subreddits, setSubreddits ] = useState(initialSubreddits);

  addSub = (sub) => {
		setSubreddits([...subreddits, sub]);
	};

  getDarkMode = () => {
    this.setState(prevState => {
      return {
        darkMode: !prevState.darkMode
      }
    });
    this.setCookie('darkMode', this.state.darkMode);
  };


    return (
      <div className={'App theme-wrapper theme-dark'}>
        <Sidebar subreddits={subreddits} />
        <MainBody />
      </div>
    );
  }

export default App;
