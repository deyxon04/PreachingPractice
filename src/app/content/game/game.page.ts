import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { FireDatabaseService } from 'src/app/services/firebase.service';
import { ConfigState } from 'src/app/store/config/reduce';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  /** Selector del estado de configuración */
  private config$: Observable<ConfigState>;

  /** Titulo de la app */
  public appTitle = '';

  /** Array de subs */
  private subs: Array<Subscription> = [];

  /** Variables del juego */
  public players: Array<string> = []
  public filterPlayers: Array<string> = []
  public sites: Array<any> = []
  public situations: Array<any> = []
  public temes: Array<any> = []
  public gameStatus: any = {}
  
  /** Variables de configuracion */
  public help: any = {
    isActive: true,
    msg: ''
  }
  public timer: any = {
    isActive: false,
    time: {
      hours: 0,
      minuts: 0,
      seconds: 0,
    }
  }

  public repeat: boolean = true

  /**
   * Constructor de la clase GameComponent 
   * @constructor
   * @param store
   */
  constructor(
    private readonly store: Store<AppState>,
    private readonly fireDatabase: FireDatabaseService
  ) {
    this.config$ = this.store.select('config');
  }

  /** Ciclo de vida ngOnInit */
  ngOnInit() {
    this.getStore();
    this.subs.push(this.fireDatabase.getCollection('sites').subscribe(value => this.sites = value))
    this.subs.push(this.fireDatabase.getCollection('situations').subscribe(value => this.situations = value))
    this.subs.push(this.fireDatabase.getCollection('temes').subscribe(value => this.temes = value))
    this.resetGame()
  }

  /** Ciclo de vida ngOnDestroy */
  ngOnDestroy() {
    this.subs.forEach((item => item.unsubscribe()));
  }

  /** Siclo de vida que se activa cada vez que se entra a la pagina */
  ionViewWillEnter() {
    if (
      (!this.allPlayersFinished() || this.repeat) && this.gameStatus.state === 'finish') this.setState('dice')
      if (!this.repeat && this.allPlayersFinished() && this.players.length !== 0 && this.gameStatus.state === 'dice') this.setState('finish')
      if (this.players.length === 0) this.setState('noPlayers')
      if (this.repeat) this.filterPlayers = []
  }

  /**
   * Función para obtener los datos del estado de config
   * @returns {void}
   */
  private getStore(): void {
    this.subs.push(this.config$.subscribe(({ appTitle, players, repeat, help, sites, situations, temes, timer }) => {
      this.appTitle = appTitle;
      this.players = players
      this.repeat = repeat
      this.sites = sites
      this.situations = situations
      this.temes = temes
      this.help.isActive = help
      this.timer = timer
    }));
  }

  /**
   * Resetea el array de participantes filtrado para que vuelvan a aparecer en los resultados
   * @returns {void}
   */
  resetFilterPlayers = () => {
    this.filterPlayers = []
    this.gameStatus.state = 'dice'
  }

  /**
   * Resetea el state del juego a 'dice' para lanzar el dado
   * @returns {void}
   */
  resetGameStatus = () => {
    this.gameStatus = {
      player: null,
      site: null,
      situation: null,
      teme: null,
      state: 'dice',
    }
    this.setHelpMsg('Toca el dado para lanzar')
  }

  /**
   * Restaura los ajustes completos para iniciar de cero
   * @returns {void}
   */
  resetGame = () => {
    this.resetGameStatus()
    this.resetFilterPlayers()
  }

  /**
   * Setea el mensaje para mostrar a los participantes
   * @param msg {string} mensaje 
   */
  setHelpMsg = (msg: string) => {
    this.help.msg = msg
  }

  /**
   * Setea el estado del juego para cambiar componentes
   * @param state estado del juego ['noPlayers', 'dice', 'task', 'finish']
   * @returns {void}
   */
  setState = (state: string) => {
    if (state === 'dice') {
      this.gameStatus.state = 'dice'
      this.setHelpMsg('Toca el dado para lanzar')
    } else if (state === 'task') {
      this.gameStatus.state = 'task'
      this.setHelpMsg(`Muy bien!, ahora, asigna la tarea de ${this.gameStatus.player}.`)
    } else if (state === 'finish') {
      this.gameStatus.state = 'finish'
      this.setHelpMsg('')
    }
  }

  /**
   * Verifica si todos los players ya salieron seleccionados y se encuentran incluidos en el filtro de players
   * @returns boolean
   */
  allPlayersFinished = () => {
    for (const player of this.players) {
      if (!this.filterPlayers.includes(player)) return false
    }
    return true
  }

}
