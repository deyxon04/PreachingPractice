import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state';
import { Observable, Subscription } from 'rxjs';
import { ConfigState } from 'src/app/store/config/reduce';

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

  /** Arrays de contenido */
  public players: Array<string> = [
    'Stiven y Karol',
    'Miguel y Genesis',
    'John Carlos y Aleja'
  ]
  public sites: Array<string> = [
    'Barcos',
    'Caminos',
    'Casas',
    'Edificios',
    'Barcos',
    'Desiertos',
    'Mercado',
  ]
  public situations: Array<string> = [
    'Enfermo',
    'Preso',
    'Niños',
    'Novios',
    'Esposos',
    'Politico',
  ]
  public temes: Array<string> = [
    'Amor',
    'Compasion',
    'Terniura'
  ]

  /** Variables del Modal input */
  public modalIsOpen: boolean = false
  public modalTitle: string = 'Modal'
  public modalValue: string = ''

  /**
   * Constructor de la clase ConfigComponent
   * @constructor
   * @param store
   */
  constructor(private readonly store: Store<AppState>) {
    this.config$ = this.store.select('config');
  }

  /** Ciclo de vida ngOnInit */
  ngOnInit() {
    this.getStore();
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
    this.subs.push(this.config$.subscribe(({ appTitle }) => {
      this.appTitle = appTitle;
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
  getModal(title: string): void {
    this.modalTitle = title
    this.modalValue = ''
    this.openModal(true)
  }

  /**
   * Agrega el nuevo item al array desigespecificonado y limpia la variable modalValue
   * @param type string, array donde se va a almacenar el nuevo item
   */
  addItem(type: string): void {
    if (type == 'Players') this.players.push(this.modalValue)
    if (type == 'Sites') this.sites.push(this.modalValue)
    if (type == 'Temes') this.temes.push(this.modalValue)
    if (type == 'Situations') this.situations.push(this.modalValue)
    this.modalValue = ''
  }


}
