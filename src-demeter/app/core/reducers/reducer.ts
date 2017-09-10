import * as user from '../actions/actions';

export interface State {
  loaded: boolean;
  loading: boolean;
  user: {};
};

const initialState: State = {
  loaded: false,
  loading: false,
  user: {}
};

export function userReducer(state = initialState, action: user.Actions): State {
  switch (action.type) {
    case user.RESET: {
      return Object.assign({}, state, {
        loaded: false,
        loading: false,
        user: {}
      });
    }

    case user.LOADED: {
      const user = action.payload;
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        user: user,
        userId: user.id
      });
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;
