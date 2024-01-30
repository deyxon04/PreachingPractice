import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ConfigState } from 'src/app/store/config/reduce';
import { AppState } from 'src/app/store/state';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  /** Selector del estado de configuración */
  private config$: Observable<ConfigState>;

  /** Titulo de la app */
  public appTitle = '';

  /** Array de subs */
  private subs: Array<Subscription> = [];

  /** Valor del dado */
  public diceValue: number;

  /**
   * Constructor de la clase GameComponent 
   * @constructor
   * @param store
   */
  constructor(private readonly store: Store<AppState>) {
    this.config$ = this.store.select('config');
    this.diceValue = 0;
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
   * Función que ejecuta la acción de lanzar el dado
   * @returns {void}
   */
  rollDice(): void {
    this.diceValue = Math.trunc(Math.random() * 6) + 1;
  }

}
