import * as fromAuth from './reducers/auth.reducer';
import * as fromLoader from './reducers/loader.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface State {
  auth: fromAuth.State;
  loader: fromLoader.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.authReducer,
  loader: fromLoader.loaderReducer
};

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getLoaderState = createFeatureSelector<fromLoader.State>('loader');
