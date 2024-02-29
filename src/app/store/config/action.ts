import { createAction, props } from '@ngrx/store';

/**
 * Acciones del estado
 */
enum ActionsEnum {
  SET_PLAYERS = 'SetPlayers',
  SET_SITES = 'SetSites',
  SET_SITUATIONS = 'SetSituations',
  SET_TEMES = 'SetTemes',
  SET_REPEAT = 'SetRepeat',
  SET_HELP = 'SetHelp',
  SET_TIMER = 'SetTimer',
}

/**
 * Acción de agregar los jugadores que dispara el reducer
 */
export const SetPlayers = createAction(
  ActionsEnum.SET_PLAYERS,
  props<{ players: Array<string> }>()
);
export const SetSites = createAction(
  ActionsEnum.SET_SITES,
  props<{ sites: Array<any> }>()
);
export const SetSituations = createAction(
  ActionsEnum.SET_SITUATIONS,
  props<{ situations: Array<any> }>()
);
export const SetTemes = createAction(
  ActionsEnum.SET_TEMES,
  props<{ temes: Array<any> }>()
);
export const SetRepeat = createAction(
  ActionsEnum.SET_REPEAT,
  props<{ repeat: boolean }>()
);
export const SetHelp = createAction(
  ActionsEnum.SET_HELP,
  props<{ help: boolean }>()
);
export const SetTimer= createAction(
  ActionsEnum.SET_TIMER,
  props<{ timer: boolean }>()
);
