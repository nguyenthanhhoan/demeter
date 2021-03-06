import { Action } from '@ngrx/store';

export const RESET =  '[Profile] Reset';
export const LOADED =  '[Profile] Loaded';

export const RESET_PROJECT =  '[Project] Reset';
export const LOADED_PROJECT =  '[Project] Loaded';

export const TOGGLE_SETTING = '[App] Toogle Setting';
export const TOGGLE_NOTIFICATION = '[App] Toogle Notification';
export const TOGGLE_SHOW_MORE_BOTTOM_BAR = '[App] Toogle Show More Bottom Bar';

export const LOADED_POSTS = '[Agribook] Loaded Posts';
export const LOADED_TOPICS = '[Agribook] Loaded Topics';
export const LOADED_FAVORITE_POSTS = '[Agribook] Loaded Favorite Posts';
export const SELECT_MENU = '[Agribook] Select Menu';
export const LOADED_NOTIFICATION = '[App] Notification Loaded';

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

export class ToggleNotificationAction implements Action {
  readonly type = TOGGLE_NOTIFICATION;
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

export class LoadedFavoritePostAction implements Action {
  readonly type = LOADED_FAVORITE_POSTS;
  constructor(public payload: any) { }
}

export class LoadedTopicAction implements Action {
  readonly type = LOADED_TOPICS;
  constructor(public payload: any) { }
}

export class AgriBookSelectMenu implements Action {
  readonly type = SELECT_MENU;
  constructor(public payload: any) { }
}

export class LoadedNotificationAction implements Action {
  readonly type = LOADED_NOTIFICATION;
  constructor(public payload: any) { }
}

export type Actions
  = ResetAction
  | LoadedAction
  | ResetProjectAction
  | LoadedProjectAction
  | ToggleSettingAction
  | ToggleShowMoreBottomBarAction
  | LoadedPostAction
  | LoadedTopicAction
  | LoadedFavoritePostAction
  | AgriBookSelectMenu
  | LoadedNotificationAction
  | ToggleNotificationAction;
