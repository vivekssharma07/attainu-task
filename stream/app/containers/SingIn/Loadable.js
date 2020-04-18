/**
 *
 * Asynchronously loads the component for SingIn
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
