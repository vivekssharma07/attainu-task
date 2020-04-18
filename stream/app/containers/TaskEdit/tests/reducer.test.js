import { fromJS } from 'immutable';
import taskEditReducer from '../reducer';

describe('taskEditReducer', () => {
  it('returns the initial state', () => {
    expect(taskEditReducer(undefined, {})).toEqual(fromJS({}));
  });
});
