import { redacktReducer as reducer } from './reducer';
import * as actions from './actions';
import generateRedditUrl from '../helpers/generateRedditUrl';


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


describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle UPDATE_ACTIVE_SUB_NAME', () => {
    expect(
      reducer(initialState, actions.updateActiveSubName('food'))
    ).toEqual({...initialState, activeSub: 'food', activeSubURL: generateRedditUrl('food', 'top')})
   });
});