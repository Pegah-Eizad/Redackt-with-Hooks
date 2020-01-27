import React from 'react';
import Header from './Header.js';
import RedditPost from "./RedditPost.js";
import addFileIcon from "../images/add-file-icon.svg";
import atIcon from "../images/at-icon.svg";

const Mainbody = (props) => {
    console.log('Mainbody activeSub:::', props.activeSub);
    console.log('Mainbody activeSubURL:::', props.activeSubURL);
    return (
    //   <div className={!this.state.isToggleOn ? 'main thread-is-closed' : 'main thread-is-open'}>
    <div className={'main thread-is-open'}>
        <Header
            activeSub={props.activeSub}
            activeSubURL={props.activeSubURL}
            // isActiveSubStarred={this.props.getIsActiveSubStarred}
            // subCount={this.state.subCount}
            // getSortType={this.props.getSortType}
            // sortType={this.props.sortType}
            // getDarkMode={this.props.getDarkMode}
            // openSideBar={this.props.openSideBar}
            // toggleStar={this.props.toggleStar}
        />
        <RedditPost
            activeSub={props.activeSub}
            activeSubURL={props.activeSubURL}
            // getSubCount={this.getSubCount}
            // isThreadOpen={this.isThreadOpen}
            // isThreadClose={this.isThreadClose}
            // morePosts={this.state.getMorePosts}
            // sortType={this.props.sortType}
        />

        <div className="message-bar">
            <div className="message-footer">
                <span className="add-file" onClick={() => this.getMorePosts()}>
                    <div className="tooltip">
                        <span className="tooltiptext tooltip-top">Click here to load more posts!</span>
                        <img src={addFileIcon} alt="add-file-icon"/>
                    </div>
                </span>
                <div className="messageBar">
                    <div className="message-bar-input">
                        <label className="tooltip">
                            <span className="tooltiptext tooltip-top">Typing here doesn't do anything yet, sorry.</span>
                            {/* <input type="text" placeholder={"Message #" + this.props.activeSub}
                                   defaultValue={this.state.searchInput}
                                   className="searchInput"
                                   onChange={this.handleChange}
                                   onKeyPress={this.handleKeyPress}
                                   onFocus={this.handleFocus}
                                   onBlur={this.handleBlur}
                                   ref={el => (this.searchInput = el)}
                            /> */}
                            <input type="text" placeholder={"Message #" + props.activeSub}
                                   className="searchInput"
                            />
                            <img src={atIcon} alt="at-icon"/>
                        </label>
                    </div>
                </div>
            </div>
        </div>

      </div>
    ); 
}

export default Mainbody;

