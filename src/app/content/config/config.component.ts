import { SetPlayers } from './../../store/config/action';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state';
import { Observable, Subscription } from 'rxjs';
import { ConfigState } from 'src/app/store/config/reduce';
import { FireDatabaseService } from 'src/app/services/firebase.service';
import { Unsubscribe } from 'firebase/firestore';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit, OnDestroy {

  /** Selector del estado de configuración */
  private config$: Observable<ConfigState>;

  /** Titulo de la app */
  public appTitle = '';

  /** Array de subs */
  private subs: Array<Subscription> = [];
  private listSubs: Array<Unsubscribe> = []

  /** Arrays de contenido */
  public players: Array<string> = []
  public sites: Array<string> = []
  public situations: Array<string> = []
  public temes: Array<string> = []

  /** Variables del Modal input */
  public modalIsOpen: boolean = false
  public modalTitle: string = 'Modal'
  public modalValue: string = ''

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
  async ngOnInit() {
    this.getStore();
    this.getList('sites')
    this.getList('Situations')
    this.getList('temes')
    this.listSubs.push(await this.fireDatabase.subscription('sites', this.getList))
    this.listSubs.push(await this.fireDatabase.subscription('situations', this.getList))
    this.listSubs.push(await this.fireDatabase.subscription('temes', this.getList))
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
    this.subs.push(this.config$.subscribe(({ appTitle, players }) => {
      this.appTitle = appTitle;
      this.players = players
    }));
  }

  /**
   * Abre o cierra la ventana modal
   * @param isOpen boolean
   */
  openModal(isOpen: boolean): void {
    this.modalIsOpen = isOpen

  }

  /** Restaura los valores de la ventana modal cuando se cierra */
  async modalDidDismiss() {
    this.modalTitle = '';
    this.modalValue = '';
    this.modalIsOpen = false;
  }

  /**
   * Asigna con el titulo la variable modalTitle y llama la ventana modal
   * @param title string, Titulo de la ventana modal
   */
  getModal = (title: string) => {
    this.modalTitle = title
    this.modalValue = ''
    this.openModal(true)
  }


  /**
   * Obtener una lista especifica con el servicio de firestore
   * @param listName Nombre de la lista
   */
  getList = async (listName: string) => {
    if (listName.toLowerCase() === 'sites'.toLowerCase()) this.sites = await this.fireDatabase.getAllDocuments('sites')
    if (listName.toLowerCase() === 'Situations'.toLowerCase()) this.situations = await this.fireDatabase.getAllDocuments('situations')
    if (listName.toLowerCase() === 'temes'.toLowerCase()) this.temes = await this.fireDatabase.getAllDocuments('temes')
  }

  /**
   * Agrega el nuevo item al array especificando y limpia la variable modalValue
   * @param type string, array donde se va a almacenar el nuevo item
   */
  addItem = async (listName: string) => {
    if (this.modalValue.trim() === '') {
      return alert('Los campos no deben estar vacios')
    }
    const list = this.listAssign(listName)
    if (listName.toLowerCase() != 'players'.toLowerCase()) {
      await this.fireDatabase.addNewDocument(listName.toLowerCase(), { title: this.modalValue.trim() })
    } else {
      this.store.dispatch(SetPlayers({ players: [...this.players, this.modalValue] }))
    }
    this.modalValue = ''
  }

  /**
   * Remueve el item del array
   * @param index indice de item
   */
  removeItem = async (listName: string, item: any) => {
    let list = []
    list = this.listAssign(listName)
    if (listName.toLowerCase() != 'players'.toLowerCase()) {
      await this.fireDatabase.deleteDocument(listName, item.id)
    } else {
      const newList = [...this.players]
      newList.splice(newList.indexOf(item), 1)
      this.store.dispatch(SetPlayers({players: newList}))
    }
  }

  /**
   * Metodo que devuelve una lista segun el nombre si existe
   * @param listName Nombre de la lista
   * @returns variable array de lista
   */
  listAssign(listName: string): any {
    let list: Array<any> = []
    if (listName.toLowerCase() == 'Players'.toLowerCase()) list = this.players
    if (listName.toLowerCase() == 'Sites'.toLowerCase()) list = this.sites
    if (listName.toLowerCase() == 'Temes'.toLowerCase()) list = this.temes
    if (listName.toLowerCase() == 'Situations'.toLowerCase()) list = this.situations
    return list
  }

}
