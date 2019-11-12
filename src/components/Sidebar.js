import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import bell from '../images/bell.svg';
import search from '../images/search-icon.svg';
import add from '../images/add-icon.svg';
import remove from '../images/remove-icon.svg';
import message from '../images/message-icon-2.svg';
import unread from '../images/unread-icon.svg';
import * as actions from '../store/actions'

const Sidebar = props => {

	const [ subreddits, setSubreddits ] = useState(props.subreddits);
	const [ activeSub, setActiveSub ] = useState(props.activeSub);
	const textInput = useRef();
	// focusSubredditInput = () => {
	// 	this.subredditInput && this.subredditInput.focus();
	// };

	const focusTextInput = () => textInput.current.focus();

	const handleChange = (e) => {
		this.setState({
			subredditInput: (e.target.value || "").toLowerCase()
		});
	};

	const handleKeyPress = (e) => {
		const { subredditInput } = this.state;
		if (e.which === 13) {
			//dispatch add sub action
		}
		e.defaultValue = "";
	};

	// const handleFocus = (e) => {
	// 	this.setState({
	// 		subredditInputHasFocus: true
	// 	});
	// };

	const handleBlur = (e) => {
		this.setState({
			subredditInput: "",
			subredditInputHasFocus: false
		});
	}

	const handleAddChannel = () => {
		props.addSub('test');
        focusTextInput();
	}

	
	
	// removeSub = (subID) => {
	// 	let oldSubs = this.state.subreddits;
	// 	let updatedPosts = [...oldSubs];
	// 	updatedPosts.splice(subID, 1);
	// 	this.setState(prevState => {
	// 	  return {
	// 		subReddits: updatedPosts
	// 	  }
	// 	});
	// };

	// toggleStar = () => {
	// 	let oldSubs = this.state.subreddits;
	// 	if (oldSubs[0] === null) {
	// 	  return 
	// 	} else {
	// 	  let newSubs = oldSubs.map(sub => {
	// 		return sub.name === this.state.activeSub ? {...sub, isStarred: !sub.isStarred} : {...sub};
	// 	  });
	// 	  this.setState(prevState => {
	// 		return {
	// 		  subReddits: newSubs,
	// 		}
	// 	  });
	// 	}      
	// }
	
	// activeSubStarredStatus = () => {
	// 	const oldSubs = this.state.subreddits;
	// 	const activeSub = this.state.activeSub;
	// 	let activeSubState = oldSubs.find(sub =>  {
	// 	  return sub.name === activeSub
	// 	 } );
	// 	return activeSubState ? activeSubState.isStarred : false;
	//   }

	// displayStarredSubs = (sub) => {
	// 	if (sub.isStarred) {
	// 		return (
	// 			<li className={sub.name === this.state.activeSub ? 'active' : ''}
	// 			//    dispatch change active sub action 
	// 			    onClick> 
	// 			  <span># {sub.name}</span>
	// 			</li>
	// 		);
	// 	}
	// }


		console.log('sidebar:::', props.subreddits);
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
							<input type="text" ref={textInput} />
						</label>
					</div>
				</div>
                
				<div className="sidebar-channels">
					<span>Starred</span>
				</div>
				<ul>
				</ul>
				<div className="sidebar-channels" >
					<span>Channels</span>
					<img src={add} alt="add-icon" onClick={handleAddChannel}/>
				</div>
				<ul>
					{/* Subreddit List */}
					{subreddits.map( (subReddit) => {
					    if (subReddit.isStarred === false) {
						  return(
							<li
								className={(subReddit.name === props.activeSub) ? 'active' : ''}
								onClick={() => setSubreddits(subReddit.name)}
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

export default connect()(Sidebar);

