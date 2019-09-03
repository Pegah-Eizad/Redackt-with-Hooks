import * as actions from '../store/actions.js';
import generateRedditUrl from '../helpers/generateRedditUrl';
import RedditPost from '../components/RedditPost.js';

const initialState = {
    state = {
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
			],
			subredditInput: "",
			subredditInputHasFocus: false,
		    },
			mainBody: {
				isActiveSubStarred=false,
				getDarkMode: false
			}
    }
};

export const redacktReducer = (state=initialState, action) => {
    if (action.type === actions.UPDATE_ACTIVE_SUB_NAME) {
        return Object.assign({}, state, {
			activeSub: action.subreddit,
            activeSubURL: generateRedditUrl(action.subreddit, state.sortType)
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