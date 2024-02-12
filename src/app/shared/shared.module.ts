import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../components/button/button.component';
import { CardComponent } from '../components/card/card.component';
import { DiceComponent } from '../components/dice/dice.component';
import { ItemComponent } from '../components/item/item.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from '../components/input/input.component';
import { TaskComponent } from '../components/task/task.component';

@NgModule({
  declarations: [
    ButtonComponent,
    CardComponent,
    ItemComponent,
    DiceComponent,
    InputComponent,
    TaskComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
  exports: [
    ButtonComponent,
    CardComponent,
    ItemComponent,
    DiceComponent,
    InputComponent,
    TaskComponent,
  ],
  
})
export class SharedModule { }
