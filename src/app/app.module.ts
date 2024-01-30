import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { localStorageSync } from 'ngrx-store-localstorage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActionReducer, ActionReducerMap, MetaReducer, StoreModule } from '@ngrx/store';
import { configReducer } from './store/config/reduce';
import { AppState } from './store/state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const reducers: ActionReducerMap<AppState> = {
  config: configReducer
};

export function localStorageSyncReducer(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return localStorageSync({
    keys: ['config'],
    rehydrate: true,
  })(reducer);
}

const metaReducers: Array<MetaReducer<AppState, any>> = [
  localStorageSyncReducer
];
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      mode: 'ios'
    }),
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    BrowserAnimationsModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
