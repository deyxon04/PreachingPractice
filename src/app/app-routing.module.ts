import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./content/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'config',
    loadChildren: () => import('./content/config/config.module').then( m => m.ConfigPageModule)
  },
  {
    path: 'game',
    loadChildren: () => import('./content/game/game.module').then( m => m.GamePageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
