import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the languageToggle state domain
 */
const selectData = state => state.userAdministration || initialState;

/**
 * Select the language locale
 */

const makeSelectData = () =>
  createSelector(
    selectData,
    state => state.data,
  );

export { selectData, makeSelectData };
