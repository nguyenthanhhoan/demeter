import * as zone from '../actions/zone-action';

export interface State {
  loaded: boolean;
  loading: boolean;
  zoneId;
  projectId;
  zone: any;
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
    case zone.RESET: {
      return Object.assign({}, state, {
        loaded: false,
        loading: false,
        zoneId: undefined,
        projectId: undefined,
        zone: {}
      });
    }

    case zone.LOADED: {
      const zone = action.payload;
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        zone: zone,
        zoneId: zone.id,
        projectId: zone.project.id
      });
    }

    case zone.ID_POPULATED: {
      const { zoneId } = action.payload;
      return Object.assign({}, state, {
        zoneId: zoneId
      });
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;
