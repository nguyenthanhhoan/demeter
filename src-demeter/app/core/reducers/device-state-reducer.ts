import * as actions from '../actions/device-state-action';

export interface State {
  packages: any[];
};

// "packages": [{
//   "thingName": "",
//   "reported": {
//     "field1": {
//       "value": 31.4
//     },
//     "field17": {
//       "value": 0
//     },
//     "connected": 1
//   }
// }]

const initialState: State = {
  packages: []
};

export function deviceReducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.UPDATED: {
      const updatedPackage = action.payload;
      const prevPackages = state.packages;
      const newPackages = prevPackages.map(prevPackage => {
        return Object.assign({}, prevPackage);
      });
      const foundNewPackage = newPackages
        .filter(newPackage => {
          return newPackage.thingName === updatedPackage.thingName;
        })[0];
      if (foundNewPackage) {
        // Update just the reported field of found package
        foundNewPackage.reported = Object.assign({}, foundNewPackage.reported, updatedPackage.reported);
      } else {
        // First time recevice data, push to the state's packages array
        newPackages.push(Object.assign({}, updatedPackage));
      }
      return Object.assign({}, {
        packages: newPackages
      });
    }
    default: {
      return state;
    }
  }
}
