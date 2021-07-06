import { createSelector } from 'reselect';
import { initialState } from './reducer';

// Lấy store app
const selectApplication = state => state.application || initialState;

const makeSelectAppData = () =>
  createSelector(
    selectApplication,
    state => state.appData,
  );

export { selectApplication, makeSelectAppData };
