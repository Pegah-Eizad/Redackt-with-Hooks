import React, { useState, useRef } from 'react';
import bell from '../images/bell.svg';
import search from '../images/search-icon.svg';
import add from '../images/add-icon.svg';
import remove from '../images/remove-icon.svg';
import message from '../images/message-icon-2.svg';
import unread from '../images/unread-icon.svg';
import * as actions from '../store/actions'

const Sidebar = props => {

	const [ subreddits, setSubreddits ] = useState(props.subreddits);
	const textInput = useRef();

	const focusTextInput = () => textInput.current.focus();

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			props.addSub(e.target.value)
		}
	};
	
	// removeSub = (subID) => {
	// }

	// toggleStar = () => {     
	// }
	
	// activeSubStarredStatus = () => {
	// }

	// displayStarredSubs = (sub) => {
	// }


	console.log('sidebar:::', subreddits);
	console.log('Sidebar activeSub:::', props.activeSub);
	console.log('Sidebar activeSubURL:::', props.activeSubURL);
	return (
		<React.Fragment>
		<div className={'sidebar'}>
			<div className="sidebar-header">
				<div className="header-bell">
					<h3>Redackt</h3>
					<img src={bell} alt="bell-icon"/>
				</div>
				<p>PegahEizad</p>
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
						<input type="text" ref={textInput} onKeyPress={handleKeyPress}/>
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
				<img src={add} alt="add-icon" onClick={focusTextInput}/>
			</div>
			<ul>
				{ subreddits.map( (subReddit) => {
					if (subReddit.isStarred === false) {
						return(
						<li
							className={(subReddit.name === props.activeSub) ? 'active' : ''}
							onClick={() => props.changeActiveSub(subReddit.name)}
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

export default Sidebar;

