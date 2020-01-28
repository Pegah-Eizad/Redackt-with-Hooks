import React, { useState, useEffect } from 'react';
// import headshot from '../images/slack-logo-icon.png';
import messageIcon from '../images/message-icon.svg';
import linkIcon from '../images/link-icon.svg';
import Media from "./Media";

const Post = (props) => {

    const [mediaExpanded, setMediaExpanded] = useState(false);

    // Check if media prop received from RedditPost component and pass URL.
    const getMedia = () => {
        let media = props.media;
        if (media) {
            if (media.reddit_video_preview) {
                return media.reddit_video_preview;
            } else {
                return media;
            }
        } else {
            return null
        }
    };

    //Get upvote number on post
    const getScore = () => {
        return props.upvotes > 999 ? (props.upvotes/1000).toFixed(1) + 'k' : props.upvotes;
    };

    const getSilver = () => {
      if (props.gildings) {
          if (props.gildings.gid_1 > 0) {
              return (
                  <div className="tooltip">
                      <span className="tooltiptext tooltip-top"><strong>{props.gildings.gid_1}</strong> silver awards.</span>
                      <button><span role="img" aria-label="bronze-award">&#x1F949;</span> {props.gildings.gid_1}</button>
                  </div>
              )
          }
      }
    };

    const getGold = () => {
        if (props.gildings) {
            if (props.gildings.gid_2 > 0) {
                return (
                    <div className="tooltip">
                        <span className="tooltiptext tooltip-top"><strong>{props.gildings.gid_2}</strong> gold awards.</span>
                        <button><span role="img" aria-label="gold-award">&#x1F948;</span> {props.gildings.gid_2}</button>
                    </div>
                )
            }
        }
    };

    const getPlat = () => {
        if (props.gildings) {
            if (props.gildings.gid_3 > 0) {
                return (
                    <div className="tooltip">
                        <span className="tooltiptext tooltip-top"><strong>{props.gildings.gid_3}</strong> platinum awards.</span>
                        <button><span role="img" aria-label="platinum-award">&#x1F947;</span> {props.gildings.gid_3}</button>
                    </div>
                )
            }
        }
    };

    const getPostDate = (created) => {
        if (created) {
            let seconds = Math.floor((new Date() - created * 1000) / 1000);
            // let date = new Date(created * 1000);
            let interval = Math.floor(seconds / 31536000);
            if (interval > 1) {
                return interval + " years ago";
            }
            interval = Math.floor(seconds / 2592000);
            if (interval > 1) {
                return interval + " months ago";
            }
            interval = Math.floor(seconds / 86400);
            if (interval > 1) {
                return interval + " days ago";
            }
            interval = Math.floor(seconds / 3600);
            if (interval > 1) {
                return interval + " hours ago";
            }
            interval = Math.floor(seconds / 60);
            if (interval > 1) {
                return interval + " minutes ago";
            }
            return Math.floor(seconds) + " seconds ago";
        }
    };
    

    // Generate random "profile pic" for messages.

     const setUserAvatar = () => { 
         return (('https://picsum.photos/100/100/?image='+ (Math.floor(Math.random() * 200))));
     }

    // getRandomThumbnail = () => {
        
    // };

    // componentDidMount() {
    //     this.getRandomThumbnail();
    // }

      const hasMedia = getMedia();
      const score = getScore();
      const messageBlockClassname = props.activeMessage === props.index && props.isToggleOn ? 'message-block active' : 'message-block';

    return (
        <React.Fragment>
          <div className={messageBlockClassname}>
            <div className="headshot">
                <img src={setUserAvatar()} alt="headshot placeholder" />
            </div>
            <div className="message">
                <p className="author">{props.author} <span className="date">{getPostDate(props.created)}</span></p>
                <p className="title">{props.title}</p>
                <div className={mediaExpanded ? 'media expanded' : 'media'}  ref={node => node}>
                    {hasMedia ? (
                        <Media
                            key={1}
                            url={getMedia()}
                        />
                    ) : (
                        <p></p>
                    )}
                </div>
                <div className="reactions">
                    <div className="tooltip">
                        <span className="tooltiptext tooltip-top"><strong>{score}</strong> people reacted with upvote.</span>
                        <button><span role="img" aria-label="thumbs-up">&#x1F44D;</span> {score}</button>
                    </div>
                    {getSilver()}
                    {getGold()}
                    {getPlat()}
                </div>
            </div>
            <div className="thread-button">
                <div className="tooltip">
                    <span className="tooltiptext tooltip-top">Open Thread</span>
                    <button className={"thread-icon"} onClick={() => props.handleThreadOpen(props.index, props.media)}>
                        <img src={messageIcon} alt="Open Thread"/>
                    </button>
                </div>
                <div className="tooltip">
                    <span className="tooltiptext tooltip-top">Open in Reddit</span>
                    <button className={"link-icon"} onClick={() => window.open(props.permalink)}>
                        <img src={linkIcon} alt="Open in Reddit"/>
                    </button>
                </div>
            </div>
          </div>
        </React.Fragment>
    );
}

export default Post;
