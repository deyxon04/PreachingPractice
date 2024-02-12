import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    TabsPageRoutingModule,
    SharedModule,
  ],
  declarations: [
    TabsPage, 
  ],
  exports: [

  ]
})
export class TabsPageModule {}
