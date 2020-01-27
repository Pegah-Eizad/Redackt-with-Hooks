import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from "./Post";
import Thread from "./Thread";


const RedditPost = (props) => {

    const [isToggleOn, setToggle] = useState(false);
    const [url, setURL] = useState('https://www.reddit.com/r/AskReddit/comments/aus97z/bartenders_of_reddit_what_is_the_strangest/.json?limit=5&sort=top&raw_json=1')
    const [activeMessage, setActiveMessage ] = useState('tests index');
    const [media, setMedia] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [subCount, setSubCount] = useState(100);
    const [moreLink, setMoreLink] = useState('https://www.reddit.com/r/askreddit/top.json?limit=10&raw_json=1&after=t3_axkl33')

    // const handleThreadOpen = (index, media) => {
    // };

    // const handleThreadClose = () => {
    // };

    // TODO: refactor
    // Go through response to see if a GIF URL, YouTube Video URL, or image URL need to be sent to the Message component.
   const getMedia = (data, index) => {
        let media = media;
        if (data.preview) {
             if (data.url.includes("png") || data.url.includes("jpg")  || data.url.includes("youtube") || data.url.includes("youtu.be")) {
                media = data.url;
            } else if (data.preview.reddit_video_preview) {
                media = data.preview;
            } else if (data.media) {
                if (data.media.reddit_video) {
                    media = data.media.reddit_video.fallback_url;
                }
            }
        } else {
            media = null;
        }
        return media;
    };

    useEffect(() => {
        axios.get(props.activeSubURL)
        .then(response => {
            setPosts(response.data.data.children);
            setIsLoading(false);
            props.getSubCount(response.data.data.children[0].data.subreddit_subscribers)
        })
        .catch(error => setErrors(error));
    }, [props]);

    // Get message function to filter out NSFW posts
    const getMessage = (post, index) => {
        if (!post.data.over_18) {
            return <Post
                key={index.toString()}
                index={index}
                title={post.data.title}
                author={post.data.author}
                url={post.data.permalink + ".json?limit=12&sort=top&raw_json=1"}
                permalink={"https://www.reddit.com" + post.data.permalink}
                upvotes={post.data.score}
                downvotes={post.data.downs}
                gildings={post.data.gildings}
                // handleThreadOpen={this.handleThreadOpen}
                // isToggleOn={this.state.isToggleOn}
                // activeMessage={this.state.activeMessage}
                media= {getMedia(post.data, index)}
                created={post.data.created_utc}
            />
     }
    };

    return (
        <React.Fragment>
            <div className={!isToggleOn ? 'main-content threads-close' : 'main-content threads-open'}>
                {!isLoading ? (
                    posts.map((post, index) => getMessage(post, index))
                ) : (
                    <p className="loading">Loading...</p>
                )}
            </div>
            <div className={!isToggleOn ? 'threads-closed' : 'threads-open'}>
                <Thread
                    activeSubURL={url}
                    toggle={isToggleOn}
                    posts={posts}
                    activeSub={props.activeSub}
                    // handleThreadClose={this.handleThreadClose}
                    media={media}
                />
            </div>
        </React.Fragment>
    )
}

export default RedditPost;