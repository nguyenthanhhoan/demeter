import { Action } from '@ngrx/store';

export const UPDATED =  '[Device State] Updated';

export class UpdatedAction implements Action {
  readonly type = UPDATED;
  constructor(public payload: any) { }
}

export type Actions
  = UpdatedAction;
