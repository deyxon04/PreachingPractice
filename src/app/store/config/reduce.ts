import { createReducer, on, Action } from "@ngrx/store";
import { SetPlayers, SetRepeat, SetSites, SetSituations, SetTemes, SetHelp, SetTimer } from "./action";


/**
 * Definición de los datos del estado
 */
export interface ConfigState {
  players: Array<string>,
  sites: Array<any>,
  situations: Array<any>,
  temes: Array<any>,
  topic: Array<string>,
  appTitle: string,
  repeat: boolean,
  help: boolean,
  timer: any
}

/**
 * Estado inicial
 */
const initialState: ConfigState = {
  players: [],
  sites: [],
  situations: [],
  temes: [],
  topic: [],
  appTitle: 'Preaching Practice',
  repeat: true,
  help: true,
  timer: {
    isActive: false,
    time: {
      hours: 0,
      minuts: 0,
      seconds: 0
    }
  },
};

/**
 * Configuraciones de los reducers
 */
const _configReducer = createReducer(
  initialState,
  on(SetPlayers, (state, { players }) => setPlayers(state, players)),
  on(SetSites, (state, { sites }) => setSites(state, sites)),
  on(SetSituations, (state, { situations }) => setSituations(state, situations)),
  on(SetTemes, (state, { temes }) => setTemes(state, temes)),
  on(SetRepeat, (state, { repeat }) => setRepeat(state, repeat)),
  on(SetHelp, (state, { help }) => setHelp(state, help)),
  on(SetTimer, (state, { timer }) => setTimer(state, timer)),
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
const setSites = (state: any, sites: Array<string>) => {
  return {
    ...state,
    sites
  }

}
const setSituations = (state: any, situations: Array<string>) => {
  return {
    ...state,
    situations
  }

}
const setTemes = (state: any, temes: Array<string>) => {
  return {
    ...state,
    temes
  }

}
const setRepeat = (state: any, repeat: boolean) => {
  return {
    ...state,
    repeat
  }

}
const setHelp = (state: any, help: boolean) => {
  return {
    ...state,
    help
  }

}
const setTimer = (state: any, timer: boolean) => {
  return {
    ...state,
    timer
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