import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { ConfigComponent } from '../config/config.component';
import { GameComponent } from '../game/game.component';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'config',
        component: ConfigComponent
      },
      {
        path: 'game',
        component: GameComponent
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
