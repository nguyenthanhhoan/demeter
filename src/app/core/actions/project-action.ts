import { Action } from '@ngrx/store';

export const RESET =  '[Project] Reset';
export const ID_POPULATED =  '[Project] ID_POPULATED';
export const LOADED =  '[Project] Loaded';

export class ResetAction implements Action {
  readonly type = RESET;
}

export class LoadedAction implements Action {
  readonly type = LOADED;
  constructor(public payload: any) { }
}

export class IdPopulatedAction implements Action {
  readonly type = ID_POPULATED;
  constructor(public payload: any) { }
}

export type Actions
  = ResetAction
  | LoadedAction
  | IdPopulatedAction;
