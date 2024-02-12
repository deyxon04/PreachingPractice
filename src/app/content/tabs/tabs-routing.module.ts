import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { ConfigPage } from '../config/config.page';
import { GamePage } from '../game/game.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'config',
        component: ConfigPage
      },
      {
        path: 'game',
        component: GamePage
      },
      {
        path: '',
        redirectTo: '/config',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/config',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
