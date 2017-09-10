import { Action } from '@ngrx/store';

export const RESET =  '[Profile] Reset';
export const LOADED =  '[Profile] Loaded';

export class ResetAction implements Action {
  readonly type = RESET;
}

export class LoadedAction implements Action {
  readonly type = LOADED;
  constructor(public payload: any) { }
}

export type Actions
  = ResetAction
  | LoadedAction;
