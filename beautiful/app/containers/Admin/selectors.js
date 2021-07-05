/* eslint-disable prettier/prettier */
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the languageToggle state domain
 */
const selectConfig = state => state.admin || initialState;

/**
 * Select the language locale
 */

const makeSelectViewConfig = () =>
  createSelector(
    selectConfig,
    state => state.config,
  );

const makeSelectCurrentUser = () =>
  createSelector(
    selectConfig,
    state => state.currentUser,
  );

export { makeSelectCurrentUser, makeSelectViewConfig };
