export const GET_POSTS = 'GET_POSTS';
export const getPosts = subreddit => ({
    type: GET_POSTS,
    subreddit
});