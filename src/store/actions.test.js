import * as actions from './actions';
// import * as types from '../../constants/ActionTypes'

fdescribe('actions', () => {
  it('should create an action to update active sub name', () => {
    const subName = 'food'
    const expectedAction = {
      type: actions.UPDATE_ACTIVE_SUB_NAME,
      subName
    }
    expect(actions.updateActiveSubName(subName)).toEqual(expectedAction);
  })
})