import React, { Component } from 'react';
import './styles/main.scss';
import Sidebar from './components/Sidebar.js';
import MainBody from './components/MainBody.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleUp, faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons'
import defaultSubreddits from './constants/subreddits.defaults';
import generateRedditUrl from './helpers/generateRedditUrl';;
library.add(faAngleUp, faAngleDown, faCheck);

class App extends Component {
  
  state = {
    sortType: "top",
    activeSub : "AskReddit",
    activeSubURL: "https://www.reddit.com/r/askreddit/top.json?limit=10&raw_json=1",
    darkMode: false,
    openSidebar: true
  };

  //Function to handle sub change from Sidebar.
  changeActiveSub = (name) => {
    this.setState(prevState => {
      return {
        activeSub: name,
        activeSubURL: generateRedditUrl(name, this.state.sortType)
      }
    });
    this.openSideBar();
  };

  getSortType = (sortType) => {
    this.setState(prevState => {
      return {
        sortType: sortType,
        activeSubURL: generateRedditUrl(this.state.activeSub, this.state.sortType)
      };
    });
  };

  getDarkMode = () => {
    this.setState(prevState => {
      return {
        darkMode: !prevState.darkMode
      }
    });
    this.setCookie('darkMode', this.state.darkMode);
  };

  render() {
    return (
      <div className={'App theme-wrapper theme-dark'}>
        <Sidebar/>
        <MainBody
            activeSub={this.state.activeSub}
            activeSubURL={this.state.activeSubURL}
            getIsActiveSubStarred={this.activeSubStarredStatus}
            getSubCount={this.getSubCount}
            sortType={this.state.sortType}
            getSortType={this.getSortType}
            getDarkMode={this.getDarkMode}
            openSideBar={this.openSideBar}
            toggleStar={this.toggleStar}
        />
      </div>
    );
  }
}

export default App;
