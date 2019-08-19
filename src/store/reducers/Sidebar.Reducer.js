import * as sidebarActions from '../store/actions/Sidebar.Actions.js';
import generateRedditUrl from '../../helpers/generateRedditUrl';
import RedditPost from '../../components/RedditPost.js';

const initialState = {
    state = {
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
		  ],
		subredditInput: "",
		subredditInputHasFocus: false,
		activeSub : "AskReddit",
		sortType: "top",
		activeSubURL: "https://www.reddit.com/r/askreddit/top.json?limit=10&raw_json=1"
    }
};

export const sidebarReducer = (state=initialState, action) => {
    if (action.type === sidebarActions.GET_POSTS) {
        return Object.assign({}, state, {
            activeSubURL: generateRedditUrl(this.action.subreddit, this.state.sortType)
        });
    }
    // else if (action.type === actions.ADD_CARD) {
    //     let lists = state.lists.map((list, index) => {
    //         if (index !== action.listIndex) {
    //             return list;
    //         }
    //         return Object.assign({}, list, {
    //             cards: [...list.cards, {
    //                 text: action.text
    //             }]
    //         });
    //     });

    //     return Object.assign({}, state, {
    //         lists
    //     });
    // }
    else {
        return state;
    }
};