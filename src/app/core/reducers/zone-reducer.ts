import * as zone from '../actions/zone-action';

export interface State {
  loaded: boolean;
  loading: boolean;
  zoneId;
  projectId;
  zone: {};
};

const initialState: State = {
  loaded: false,
  loading: false,
  zoneId: undefined,
  projectId: undefined,
  zone: {}
};

export function zoneReducer(state = initialState, action: zone.Actions): State {
  switch (action.type) {
    case zone.LOADED: {
      const zone = action.payload;
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        zone: zone
      });
    }

    case zone.ID_POPULATED: {
      const { zoneId } = action.payload;
      const { projectId } = action.payload;
      return Object.assign({}, state, {
        zoneId: zoneId,
        projectId: projectId,
      });
    }

    default: {
      return state;
    }
  }
}


export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;
