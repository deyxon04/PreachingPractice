import { SetHelp, SetPlayers, SetRepeat, SetSites, SetSituations, SetTemes, SetTimer } from './../../store/config/action';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state';
import { Observable, Subscription } from 'rxjs';
import { ConfigState } from 'src/app/store/config/reduce';
import { FireDatabaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'config-page',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
// @Injectable()
export class ConfigPage implements OnInit, OnDestroy {

  /** Selector del estado de configuración */
  private config$: Observable<ConfigState>;

  /** Titulo de la app */
  public appTitle = '';

  /** Array de subs */
  private subs: Array<Subscription> = [];
  private listSubs: Array<Subscription> = []

  /** Arrays de contenido */
  public players: Array<string> = []
  public sites: Array<any> = []
  public situations: Array<any> = []
  public temes: Array<any> = []

  /** variables de configuracion */
  public repeat: boolean = true
  public help: boolean = true
  public timer: any = {
    isActive: false,
    time: {
      hours: 0,
      minuts: 0,
      seconds: 0,
    }
  }
  num: number = 0

  /**
   * Constructor de la clase ConfigComponent
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
    this.listSubs.push(this.fireDatabase.getCollection('sites').subscribe((value: any) => {
      this.sites = value
      this.setStore('sites', value)
    }))
    this.listSubs.push(this.fireDatabase.getCollection('situations').subscribe((value: any) => {
      this.situations = value
      this.setStore('situations', value)
    }))
    this.listSubs.push(this.fireDatabase.getCollection('temes').subscribe((value: any) => {
      this.temes = value
      this.setStore('temes', value)
    }))
  }

  /** Ciclo de vida ngOnDestroy */
  ngOnDestroy() {
    this.subs.forEach((item => item.unsubscribe()));

  }

  /**
   * Función para obtener los datos del estado de config
   * @returns {void}
   */
  private getStore(): void {
    this.subs.push(this.config$.subscribe(({ appTitle, players, sites, situations, temes, repeat, help, timer }) => {
      this.appTitle = appTitle;
      this.players = players
      this.sites = sites
      this.situations = situations
      this.temes = temes
      this.repeat = repeat
      this.help = help
      this.timer = timer
    }));
  }

  /**
   * Almacena los datos en el storage local
   * @param listName nombre de lista
   * @param value datos de la lista
   */
  setStore(listName: string, value: any): void {
    if (listName.toLowerCase() === 'players'.toLowerCase()) this.store.dispatch(SetPlayers({ players: value }))
    if (listName.toLowerCase() === 'sites'.toLowerCase()) this.store.dispatch(SetSites({ sites: value }))
    if (listName.toLowerCase() === 'situations'.toLowerCase()) this.store.dispatch(SetSituations({ situations: value }))
    if (listName.toLowerCase() === 'temes'.toLowerCase()) this.store.dispatch(SetTemes({ temes: value }))
    if (listName.toLowerCase() === 'repeat'.toLowerCase()) this.store.dispatch(SetRepeat({ repeat: value }))
    if (listName.toLowerCase() === 'help'.toLowerCase()) this.store.dispatch(SetHelp({ help: value }))
    if (listName.toLowerCase() === 'timer'.toLowerCase()) this.store.dispatch(SetTimer({ timer: value }))
  }

  /**
   * Agrega el nuevo item al array especificando y limpia la variable modalValue
   * @param type string, array donde se va a almacenar el nuevo item
   */
  addItem = async (listName: string, value: string) => {
    if (value.trim() === '') {
      return alert('Campos vacios')
    }
    if (listName.toLowerCase() != 'players'.toLowerCase()) {
      await this.fireDatabase.addNewDocument(listName.toLowerCase(), { title: value.trim() })
    } else {
      this.setStore(listName, [...this.players, value])
    }
  }

  /**
   * Remueve el item del array
   * @param index indice de item
   */
  removeItem = async ({ listName, item }: any) => {
    let list = []
    list = this.listAssign(listName)
    if (listName.toLowerCase() != 'players'.toLowerCase()) await this.fireDatabase.deleteDocument(listName, item.id)

    const newList = [...list]
    newList.splice(newList.indexOf(item), 1)
    this.setStore(listName, newList)
  }

  /** Filtra los model de los input del timer para almacenar los valores limpios */
  saveTimer(part: string, event: any) {
    let value = parseInt(event.replace(/^0+|[^0-9]/g, ""))
    if (Number.isNaN(value)) value = 0

    if (part == 'hours') this.timer.time.hours = value
    if (part == 'minuts') this.timer.time.minuts = value
    if (part == 'seconds') this.timer.time.seconds = value
    this.setStore('timer', this.timer)
  }

  /** Setea la variable de preferencia repeat para el juego */
  setRepeat() {
    const value = !this.repeat ? false : true
    this.store.dispatch(SetRepeat({ repeat: value }))
  }

  /**
   * Metodo que devuelve una lista segun el nombre si existe
   * @param listName Nombre de la lista
   * @returns variable array de lista
   */
  listAssign(listName: string): any {
    let list: Array<any> = []
    if (listName.toLowerCase() == 'players'.toLowerCase()) list = this.players
    if (listName.toLowerCase() == 'sites'.toLowerCase()) list = this.sites
    if (listName.toLowerCase() == 'temes'.toLowerCase()) list = this.temes
    if (listName.toLowerCase() == 'situations'.toLowerCase()) list = this.situations
    return list
  }


}
