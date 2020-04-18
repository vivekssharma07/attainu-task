import { fromJS } from 'immutable';
import taskDetailsReducer from '../reducer';

describe('taskDetailsReducer', () => {
  it('returns the initial state', () => {
    expect(taskDetailsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
