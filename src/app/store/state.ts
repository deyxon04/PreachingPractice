import { ConfigState } from "./config/reduce";

/**
 * Definición del estado en general de la app
 */
export interface AppState {
  config: ConfigState
}

export function clearState(reducer: Function) {
  return function (state: AppState, action: object) {
    return reducer(state, action);
  };
}