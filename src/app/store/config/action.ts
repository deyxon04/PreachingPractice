import { createAction, props } from '@ngrx/store';

/**
 * Acciones del estado
 */
enum ActionsEnum {
  SET_PLAYERS = 'SetPlayers'
}

/**
 * Acción de agregar los jugadores que dispara el reducer
 */
export const SetPlayers = createAction(
  ActionsEnum.SET_PLAYERS,
  props<{ players: Array<string> }>()
);
