import { Action } from '@ngrx/store';

export const RESET =  '[Profile] Reset';
export const LOADED =  '[Profile] Loaded';

export const RESET_PROJECT =  '[Project] Reset';
export const LOADED_PROJECT =  '[Project] Loaded';

export const TOGGLE_SETTING = '[App] Toogle Setting';
export const TOGGLE_SHOW_MORE_BOTTOM_BAR = '[App] Toogle Show More Bottom Bar';

export const LOADED_POSTS = '[Agribook] Loaded Posts';

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

export class ToggleShowMoreBottomBarAction implements Action {
  readonly type = TOGGLE_SHOW_MORE_BOTTOM_BAR;
  constructor(public payload: any) { }
}

export class LoadedPostAction implements Action {
  readonly type = LOADED_POSTS;
  constructor(public payload: any) { }
}

export type Actions
  = ResetAction
  | LoadedAction
  | ResetProjectAction
  | LoadedProjectAction
  | ToggleSettingAction
  | ToggleShowMoreBottomBarAction
  | LoadedPostAction;
