import { Action } from '@ngrx/store';

export const RESET =  '[Profile] Reset';
export const LOADED =  '[Profile] Loaded';

export const RESET_PROJECT =  '[Project] Reset';
export const LOADED_PROJECT =  '[Project] Loaded';

export const TOGGLE_SETTING = '[App] Toogle Setting';

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

export class ToggleSettingAction implements Action {
  readonly type = TOGGLE_SETTING;
  constructor(public payload: any) { }
}

export type Actions
  = ResetAction
  | LoadedAction
  | ResetProjectAction
  | LoadedProjectAction
  | ToggleSettingAction;
