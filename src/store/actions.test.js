import * as actions from './actions';
// import * as types from '../../constants/ActionTypes'

fdescribe('actions', () => {
  it('should create an action to update active sub name', () => {
    const subreddit = 'food'
    const expectedAction = {
      type: actions.UPDATE_ACTIVE_SUB_NAME,
      subreddit
    }
    expect(actions.updateActiveSubName(subreddit)).toEqual(expectedAction);
  })
})