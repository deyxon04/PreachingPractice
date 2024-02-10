import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-component',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent  implements OnInit {

  @Input() players!: string[]
  @Input() player!: string
  @Input() listName!: string
  @Input() callback!: Function 
  @Input() index!: number

  showButton: boolean = false

  constructor() { }

  ngOnInit() {}

  removeItem(){
    this.callback({listName: this.listName, item: this.player})
  }

}
