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
import { ButtonComponent } from 'src/app/components/button/button.component';
import { FireDatabaseService } from 'src/app/services/firebase.service';

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
    ButtonComponent,
  ],
  exports: [
    CardComponent,
    ListComponent,
    ButtonComponent,
  ]
})
export class TabsPageModule {}
