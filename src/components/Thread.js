import React, { useState, useEffect }  from 'react';
import axios from "axios";
import Message from "./Message.js";

const Thread = (props) => {
    // state = {
    //     posts: [],
    //     isLoading: true,
    //     errors: null
    // };

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState(null);

    // Make data request through axios
    const getPosts = (url) => {
        axios.get(url)
        // Once we get a response and store data, let's change the loading state
            .then(response => {
                setPosts(response.data);
                setIsLoading(false);
            })
            // If we catch any errors connecting, let's update accordingly
            // .catch(error => this.setState({ error, isLoading: false }));
    }

    // const getDefaultSubPosts = () => {
    //     useEffect(() => getPosts(props.activeSubURL));
    // }

    useEffect((prevProps) => {
        if (props.activeSubURL) {
            // response = getPosts();
            getPosts(props.activeSubURL);
            //setPosts('empty');  
        }
    }, [props]);

    // Set new URL state if props updated and get new posts. (I think this is how it should work?)
    // componentDidUpdate(prevProps) {
    //     if (this.props.url !== prevProps.url) {
    //         this.getPosts();
    //     }
    // }
        return (
            <div className={"thread-content"}>
                <div className="thread-header">
                    <div className="thread-title">
                        <h3>Thread</h3>
                        <p key={0}># {props.activeSub}</p>
                    </div>
                    <div className="thread-button-close">
                        <button onClick={() => props.handleThreadClose()}>X</button>
                    </div>
                </div>
                {!isLoading ? (
                    posts.map((post, index) => {
                        if (index === 0) {
                            return post.data.children.map((post, index) => {
                                return <React.Fragment key={index}>
                                    <div className="threadTopic">
                                    <Message
                                        key={index.toString()}
                                        title={post.data.title}
                                        author={post.data.author}
                                        upvotes={post.data.score}
                                        gildings={post.data.gildings}
                                        media={props.media}
                                        noClick={true}
                                    />
                                </div>
                                    <div className="replies">replies</div>
                                </React.Fragment>

                            })
                        } else {
                            return post.data.children.map((post, index) => {
                                return <React.Fragment key={index}>
                                    <Message
                                    key={index.toString()}
                                    title={post.data.body}
                                    author={post.data.author}
                                    upvotes={post.data.score}
                                    gildings={post.data.gildings}
                                    noClick={true}
                                />
                                </React.Fragment>
                            })
                        }
                    })
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        )  
}

export default Thread;