import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Message from "./Message";
import Thread from "./Thread";


const  RedditPost = props => {

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
    //     this.setState(prevState => ({
    //         isToggleOn: true,
    //         url: "https://www.reddit.com" + this.state.posts[index].data.permalink + ".json?&raw_json=1&sort=" + this.props.sortType,
    //         activeMessage: index,
    //         media: media
    //     }));
    //     this.props.isThreadOpen();
    // };

    // const handleThreadClose = () => {
    //     this.setState(prevState => ({
    //         isToggleOn: !prevState.isToggleOn
    //     }));
    //     this.props.isThreadClose();
    // };

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

    // Get more posts after initial posts.
    // const getMorePosts = (url) => {
    //     axios.get(url)
    //         .then(response => {
    //                 return {
    //                     setPosts([...prevState.posts, ...response.data.data.children]),
    //                     setIsLoading(false)
    //                 }
    //         })
    //         .catch(error => setErrors(error));
    // };

        useEffect(() => {
            axios.get(props.activeSubURL)
            .then(response => {
                setPosts(response.data.data.children);
                setIsLoading(false);
                props.getSubCount(response.data.data.children[0].data.subreddit_subscribers)
            })
            .catch(error => setErrors(error));
        }, [props]);


    // Once the RedditPost props update:
    // 1) If more posts is clicked, getMorePosts based on the activeSubURL.
    // 2) If the activeSub changes, or the sortType changes, call getPosts and reload the block.
    // componentDidUpdate(prevProps) {
    //     if (this.props.morePosts !== prevProps.morePosts) {
    //         let posts = this.state.posts;
    //         let afterID = posts[posts.length-1].data.name;
    //         let url = "https://www.reddit.com/r/" + this.props.activeSub.toLowerCase() + "/"+this.props.sortType+".json?limit=10&raw_json=1&after=" + afterID;
    //         this.setState(prevState => ({
    //             moreLink: url
    //         }));
    //         this.getMorePosts(url);
    //     } else if (this.props.activeSub !== prevProps.activeSub || this.props.sortType !== prevProps.sortType) {
    //         let url = "https://www.reddit.com/r/" + this.props.activeSub.toLowerCase() + "/"+this.props.sortType+".json?limit=10&raw_json=1";
    //         this.setState(prevState => ({
    //             activeSub: this.props.activeSub,
    //             sortType: this.props.sortType
    //         }));
    //         this.getPosts(url);
    //     }
    // }

    // Get message function to filter out NSFW posts so I don't randomly
    // see weiners when testing sort by new.
    const getMessage = (post, index) => {
        if (!post.data.over_18) {
            return <Message
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
                    // getDefaultSubPosts(),
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