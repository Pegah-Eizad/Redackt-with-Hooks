import * as actions from '../store/actions.js';
import generateRedditUrl from '../helpers/generateRedditUrl';
import RedditPost from '../components/RedditPost.js';

const initialState = {
			sortType: "top",
			subredditInput: "",
			subredditInputHasFocus: false,
			activeSub: "AskReddit",
			activeSubURL: "https://www.reddit.com/r/askreddit/top.json?limit=10&raw_json=1",
			sidebar: {
				subreddits: [
				{
				name: "AskReddit",
				isStarred: false,
				id: 0
				},
				{
				name: "all",
				isStarred: false,
				id: 1
				},
				{
				name: "RocketLeague",
				isStarred: false,
				id: 2
				},
				{
				name: "pics",
				isStarred: false,
				id: 3
				},
				{
				name: "reactjs",
				isStarred: false,
				id: 4
				},
				{
				name: "videos",
				isStarred: false,
				id: 5
				}
			  ]
		    },
			mainBody: {
				isActiveSubStarred: false,
				getDarkMode: false
			}
};

export const redacktReducer = (state=initialState, action) => {
    if (action.type === actions.UPDATE_ACTIVE_SUB_NAME) {
		console.log('Dispatching update Active Sub in Reducer !!!');
        return Object.assign({}, state, {
			activeSub: action.subreddit,
			activeSubURL: generateRedditUrl(action.subreddit, state.sortType)
        });
    }
    else {
        return state;
    }
};