import * as actions from '../actions/actions';

export interface State {
  loaded: boolean;
  loading: boolean;
  user: {};
  project: {};
  notifications: any[];
};

const initialState: State = {
  loaded: false,
  loading: false,
  user: {},
  project: {},
  notifications: []
};

export interface AppState {
  isShowSetting: boolean;
  isShowMoreBottomBar: boolean;
  isShowNotification: boolean;
};

const initialAppState: AppState = {
  isShowSetting: false,
  isShowMoreBottomBar: false,
  isShowNotification: false
};

const initialAgriBookState: any = {
  posts: [],
  postsLoaded: false,
  topics: [],
  topicsLoaded: false,
  favoritePosts: [],
  favoritePostsLoaded: false,
  trendingPosts: [],
  homeActiveMenu: 'all'
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

    case actions.LOADED_NOTIFICATION: {
      const notifications = action.payload;
      return Object.assign({}, state, {
        notifications: notifications
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
    case actions.TOGGLE_NOTIFICATION: {
      const isShowNotification = action.payload;
      return Object.assign({}, state, {
        isShowNotification: isShowNotification
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
        postsLoaded: true,
        trendingPosts: posts.filter((post) => post.trending)
      });
    }
    case actions.LOADED_TOPICS: {
      const topics = action.payload;
      return Object.assign({}, state, {
        topics: topics,
        topicsLoaded: true
      });
    }
    case actions.LOADED_FAVORITE_POSTS: {
      const favoritePosts = action.payload;
      return Object.assign({}, state, {
        favoritePosts: favoritePosts,
        favoritePostsLoaded: true
      });
    }
    case actions.SELECT_MENU: {
      const homeActiveMenu = action.payload;
      return Object.assign({}, state, {
        homeActiveMenu: homeActiveMenu
      });
    }
    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;
