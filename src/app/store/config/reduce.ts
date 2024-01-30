import { createReducer, on, Action } from "@ngrx/store";
import { SetPlayers } from "./action";


/**
 * Definición de los datos del estado
 */
export interface ConfigState {
  players: Array<string>,
  topic: Array<string>,
  appTitle: string
}

/**
 * Estado inicial
 */
const initialState: ConfigState = {
  players: [],
  topic: [],
  appTitle: 'Preaching Practice'
};

/**
 * Configuraciones de los reducers
 */
const _configReducer = createReducer(
  initialState,
  on(SetPlayers, (state, { players }) => setPlayers(state, players)),
);



/**
 * Reducer para agregar los jugadores
 * @param {any} state
 * @param {Array<string>} players
 * @returns {object}
 */
const setPlayers = (state: any, players: Array<string>) => {
  return {
    ...state,
    players
  }

}

/**
 * Configuración del reducer en general
 * @param {any} state
 * @param {Action} action
 * @returns {object}
 */
export function configReducer(state: any, action: Action) {
  return _configReducer(state, action);
}