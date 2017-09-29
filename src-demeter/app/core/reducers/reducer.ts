import * as actions from '../actions/actions';

export interface State {
  loaded: boolean;
  loading: boolean;
  user: {};
  project: {};
};

const initialState: State = {
  loaded: false,
  loading: false,
  user: {},
  project: {}
};

export interface AppState {
  isShowSetting: boolean;
  isShowMoreBottomBar: boolean;
};

const initialAppState: AppState = {
  isShowSetting: false,
  isShowMoreBottomBar: false
};

const initialAgriBookState: any = {
  posts: [],
  postsLoaded: false,
  topics: []
};

export function appReducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.RESET: {
      return Object.assign({}, state, {
        loaded: false,
        loading: false,
        user: {}
      });
    }

    case actions.LOADED: {
      const user = action.payload;
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        user: user
      });
    }

    case actions.RESET_PROJECT: {
      return Object.assign({}, state, {
        loaded: false,
        loading: false,
        project: {}
      });
    }

    case actions.LOADED_PROJECT: {
      const project = action.payload;
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        project: project,
      });
    }
    default: {
      return state;
    }
  }
}

// TODO: Change this to appReducer
export function appStateReducer(state = initialAppState, action: actions.Actions): AppState {
  switch (action.type) {
    case actions.TOGGLE_SETTING: {
      const isShowSetting = action.payload;
      return Object.assign({}, state, {
        isShowSetting: isShowSetting
      });
    }
    case actions.TOGGLE_SHOW_MORE_BOTTOM_BAR: {
      const isShowMoreBottomBar = action.payload;
      return Object.assign({}, state, {
        isShowMoreBottomBar: isShowMoreBottomBar
      });
    }
    default: {
      return state;
    }
  }
}

export function agriBookStateReducer(state = initialAgriBookState, action: actions.Actions): AppState {
  switch (action.type) {
    case actions.LOADED_POSTS: {
      const posts = action.payload;
      return Object.assign({}, state, {
        posts: posts,
        postsLoaded: true
      });
    }
    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;
