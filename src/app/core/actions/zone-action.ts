import { Action } from '@ngrx/store';

export const ID_POPULATED =  '[Zone] ID_POPULATED';
export const LOADED =  '[Zone] Loaded';


export class LoadedAction implements Action {
  readonly type = LOADED;

  constructor(public payload: {}) { }
}

export class IdPopulatedAction implements Action {
  readonly type = ID_POPULATED;

  constructor(public payload: any) { }
}

export type Actions
  = LoadedAction
  | IdPopulatedAction;
