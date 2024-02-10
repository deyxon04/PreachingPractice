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
  public repeat: boolean = true
  public players: Array<string> = []
  public filterPlayers: Array<string> = []
  public sites: Array<any> = []
  public situations: Array<any> = []
  public temes: Array<any> = []
  public results: any = {}
  public msg: string = ''

  /** >variables de configuracion */
  public help: boolean = true
  private playersSnapShot: Array<string> = []

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
  }

  /** Ciclo de vida ngOnDestroy */
  ngOnDestroy() {
    this.subs.forEach((item => item.unsubscribe()));
  }

  ionViewWillEnter() {
    if (this.players.toString() !== this.playersSnapShot.toString()) {
      this.resetResult()
    }
  }

  /**
   * Función para obtener los datos del estado de config
   * @returns {void}
   */
  private getStore(): void {
    this.subs.push(this.config$.subscribe(({ appTitle, players, repeat, help, sites, situations, temes }) => {
      this.appTitle = appTitle;
      this.players = players
      this.repeat = repeat
      this.sites = sites
      this.situations = situations
      this.temes = temes
      this.help = help
    }));
  }

  /**
   * Resetea el array de participantes filtrado para que vuelvan a aparecer en los resultados
   * @returns {void}
   */
  resetFilterPlayers(): void {
    this.filterPlayers = []
  }

  resetResult = () => {
    this.results = {}
    this.setMsg('Toca el dado para lanzar')
  }

  resetGame = () => {
    this.resetFilterPlayers()
  }

  /**
   * Setea el mensaje para mostrar a los participantes
   * @param msg {string} mensaje 
   */
  setMsg = (msg: string) => {
    if (this.help) this.msg = msg
  }
}
