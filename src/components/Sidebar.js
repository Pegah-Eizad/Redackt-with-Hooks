import React, { Component } from 'react';
import { connect } from 'react-redux';
import bell from '../images/bell.svg';
import search from '../images/search-icon.svg';
import add from '../images/add-icon.svg';
import remove from '../images/remove-icon.svg';
import message from '../images/message-icon-2.svg';
import unread from '../images/unread-icon.svg';
import * as actions from '../store/actions'

export class Sidebar extends Component {

	focusSubredditInput = () => {
		this.subredditInput && this.subredditInput.focus();
	};

	handleChange = (e) => {
		this.setState({
			subredditInput: (e.target.value || "").toLowerCase()
		});
	};

	handleKeyPress = (e) => {
		const { subredditInput } = this.state;
		if (e.which === 13) {
			//dispatch add sub action
		}
		e.defaultValue = "";
	};

	handleFocus = (e) => {
		this.setState({
			subredditInputHasFocus: true
		});
	};

	handleBlur = (e) => {
		this.setState({
			subredditInput: "",
			subredditInputHasFocus: false
		});
	}

	addSub = (name) => {
		let oldSubs = this.state.subreddits;
		let newSubs = [...oldSubs, {"name": name, "id": oldSubs.length}];
		this.setState(prevState => {
		  return {
			subReddits: newSubs,
			activeSub: name,
			activeSubURL: "https://www.reddit.com/r/" + name + "/"+ this.state.sortType+".json?limit=10&raw_json=1"
		  }
		});
	};
	
	removeSub = (subID) => {
		let oldSubs = this.state.subreddits;
		let updatedPosts = [...oldSubs];
		updatedPosts.splice(subID, 1);
		this.setState(prevState => {
		  return {
			subReddits: updatedPosts
		  }
		});
	};

	toggleStar = () => {
		let oldSubs = this.state.subreddits;
		if (oldSubs[0] === null) {
		  return 
		} else {
		  let newSubs = oldSubs.map(sub => {
			return sub.name === this.state.activeSub ? {...sub, isStarred: !sub.isStarred} : {...sub};
		  });
		  this.setState(prevState => {
			return {
			  subReddits: newSubs,
			}
		  });
		}      
	}
	
	activeSubStarredStatus = () => {
		const oldSubs = this.state.subreddits;
		const activeSub = this.state.activeSub;
		let activeSubState = oldSubs.find(sub =>  {
		  return sub.name === activeSub
		 } );
		return activeSubState ? activeSubState.isStarred : false;
	  }

	displayStarredSubs = (sub) => {
		if (sub.isStarred) {
			return (
				<li className={sub.name === this.state.activeSub ? 'active' : ''}
				//    dispatch change active sub action 
				    onClick> 
				  <span># {sub.name}</span>
				</li>
			);
		}
	}

	updateActiveSubName = (subreddit) => {
         this.props.dispatch(actions.updateActiveSubName(subreddit));
    };

	componentWillMount() {
		// let subs = this.state.subreddits;
	}

	render() {
		console.log(':::', this.props);
		return (
			<React.Fragment>
			<div className={'sidebar'}>
				<div className="sidebar-header">
					<div className="header-bell">
						<h3>Redackt</h3>
						<img src={bell} alt="bell-icon"/>
					</div>
					<p>romanparkhomenko</p>
				</div>

				<div className="sidebar-threads">
					<div className="tooltip">
						<span className="tooltiptext tooltip-top">Not sure what to make this do yet.</span>
						<div><img src={unread} alt="thread-icon"/>All Unreads</div>
					</div>
					<div className="tooltip">
						<span className="tooltiptext tooltip-top">Not sure what to make this do yet.</span>
						<div><img src={message} alt="thread-icon"/>All Threads</div>
					</div>
				</div>

				<div className="sidebar-add-channel">
					<div className="jump-to">
						<label>
							<img src={search} alt="search-icon"/>
							<input type="text" placeholder="Add Sub..."
								   defaultValue=""
								   className="addSubInput"
								   onChange={this.handleChange}
								   onKeyPress={this.handleKeyPress}
								   onFocus={this.handleFocus}
								   onBlur={this.handleBlur}
								   ref={el => (this.subredditInput = el)}
							/>
						</label>
					</div>
				</div>
                
				<div className="sidebar-channels" onClick={this.focusSubredditInput}>
					<span>Starred</span>
				</div>
				<ul>
					{this.props.sidebarState.subreddits.map((subReddit) =>
					  this.displayStarredSubs(subReddit)
					)}
				</ul>
				<div className="sidebar-channels" onClick={this.focusSubredditInput}>
					<span>Channels</span>
					<img src={add} alt="add-icon"/>
				</div>
				<ul>
					{/* Subreddit List */}
					{this.props.sidebarState.subreddits.map( (subReddit) => {
					    if (subReddit.isStarred === false) {
						  return(
							<li
								className={(subReddit.name === this.props.activeSub) ? 'active' : ''}
								onClick={() => this.updateActiveSubName(subReddit.name)}
								key={subReddit.id.toString()} >
								<span># {subReddit.name}</span>
								<span className={"remove-button"}>
									{/* dispatch remove sub  */}
								<button>
									<img src={remove} alt="Remove Subreddit"/>
								</button>
								</span>
							</li>
						  );
						}
				      }
					)}
				</ul>

				<div className="sidebar-channels direct-messages">
					<span>Direct Messages</span>
					<img src={add} alt="add-icon"/>
				</div>
				<div className="direct-messages">
					<ul>
						<li><p>slackbot</p></li>
						<li><p>Snoo</p></li>
						<li><p>romanparkhomenko</p></li>
					</ul>
				</div>

			</div>
			</React.Fragment>
		);
	}
}

export default connect()(Sidebar);

