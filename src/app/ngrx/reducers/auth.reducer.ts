import {AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED} from '../actions/auth.actions';
import {AuthUser} from '../../models/Auth';

export interface State {
  user: AuthUser;
}

const initialState: State = {
  user: null
};

export function authReducer(state = initialState, action: AuthActions): any {
  switch (action.type) {
    case SET_AUTHENTICATED:
    const authUser = new AuthUser(
      action.payload.email,
      action.payload.id,
      action.payload._token,
      action.payload._tokenExpirationDate
    );
    return {
      ...state,
      user: authUser
    };
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        user: null
      };
    default: {
      return state;
    }
  }
}

