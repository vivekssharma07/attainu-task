import { fromJS } from 'immutable';
import singInReducer from '../reducer';

describe('singInReducer', () => {
  it('returns the initial state', () => {
    expect(singInReducer(undefined, {})).toEqual(fromJS({}));
  });
});
