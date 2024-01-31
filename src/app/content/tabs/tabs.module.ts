import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { ConfigComponent } from '../config/config.component';
import { GameComponent } from '../game/game.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { ListComponent } from 'src/app/components/list/list.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  declarations: [
    TabsPage, 
    ConfigComponent, 
    GameComponent, 
    CardComponent,
    ListComponent,
  ],
  exports: [
    CardComponent,
    ListComponent,
  ]
})
export class TabsPageModule {}
