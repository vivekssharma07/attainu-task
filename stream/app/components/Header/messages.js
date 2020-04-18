/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Header';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  signUp: {
    id: `${scope}.signUp`,
    defaultMessage: 'Register Form',
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Login',
  },
  task: {
    id: `${scope}.task`,
    defaultMessage: 'Task Addition',
  }
});
