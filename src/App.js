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
        <Sidebar sidebarState={this.props.sidebar} activeSub={this.props.activeSub}/>
        <MainBody />
      </div>
    );
  }
}


App.defaultProps = {
    activeSub: "AskReddit",
    activeSubURL: "https://www.reddit.com/r/askreddit/top.json?limit=10&raw_json=1",
    sortType: "top"
};

const mapStateToProps = state => ({
  sidebar: state.sidebar,
  activeSub: state.activeSub
});

export default connect(mapStateToProps)(App);
