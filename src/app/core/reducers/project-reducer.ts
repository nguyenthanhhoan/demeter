import * as project from '../actions/project-action';

export interface State {
  loaded: boolean;
  loading: boolean;
  projectId;
  project: {};
};

const initialState: State = {
  loaded: false,
  loading: false,
  projectId: undefined,
  project: {}
};

export function projectReducer(state = initialState, action: project.Actions): State {
  switch (action.type) {
    case project.RESET: {
      return Object.assign({}, state, {
        loaded: false,
        loading: false,
        project: {}
      });
    }

    case project.LOADED: {
      const project = action.payload;
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        project: project
      });
    }

    case project.ID_POPULATED: {
      const { projectId } = action.payload;
      return Object.assign({}, state, {
        projectId: projectId
      });
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;
