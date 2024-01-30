import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state';
import { Observable, Subscription } from 'rxjs';
import { ConfigState } from 'src/app/store/config/reduce';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html'
})
export class ConfigComponent implements OnInit, OnDestroy {

  /** Selector del estado de configuración */
  private config$: Observable<ConfigState>;

  /** Titulo de la app */
  public appTitle = '';

  /** Array de subs */
  private subs: Array<Subscription> = [];

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
}
