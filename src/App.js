import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/main.scss';
import Sidebar from './components/Sidebar.js';
import MainBody from './components/MainBody.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleUp, faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons'
import generateRedditUrl from './helpers/generateRedditUrl';
library.add(faAngleUp, faAngleDown, faCheck);

class App extends Component {
  
  // getSortType = (sortType) => {
  //   this.setState(prevState => {
  //     return {
  //       sortType: sortType,
  //       activeSubURL: this.generateRedditUrl(this.state.activeSub, this.state.sortType)
  //     };
  //   });
  // };

  updateActiveSubName = (sub) => {
    // this.setState(activeSub: sub)
    console.log('hi');
  }

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
        <Sidebar updateActiveSubName = {this.updateActiveSubName}/>
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
