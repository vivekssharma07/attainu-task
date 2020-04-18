import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the singIn state domain
 */

const selectSingInDomain = state => state.get('singIn', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SingIn
 */

const makeSelectSingIn = () =>
  createSelector(selectSingInDomain, substate => substate.toJS());

export default makeSelectSingIn;
export { selectSingInDomain };
