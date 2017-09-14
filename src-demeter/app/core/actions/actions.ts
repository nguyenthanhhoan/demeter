import { Action } from '@ngrx/store';

export const RESET =  '[Profile] Reset';
export const LOADED =  '[Profile] Loaded';

export const RESET_PROJECT =  '[Project] Reset';
export const LOADED_PROJECT =  '[Project] Loaded';

export class ResetAction implements Action {
  readonly type = RESET;
}

export class LoadedAction implements Action {
  readonly type = LOADED;
  constructor(public payload: any) { }
}

export class ResetProjectAction implements Action {
  readonly type = RESET_PROJECT;
}

export class LoadedProjectAction implements Action {
  readonly type = LOADED_PROJECT;
  constructor(public payload: any) { }
}

export type Actions
  = ResetAction
  | LoadedAction
  | ResetProjectAction
  | LoadedProjectAction;
