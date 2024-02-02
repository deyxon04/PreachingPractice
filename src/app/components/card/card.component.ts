import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-component',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent  implements OnInit {

  @Input() players: string[] = []
  @Input() listName: string = ''
  @Input() removeItem: any 

  showButton: boolean = false

  constructor() { }

  ngOnInit() {}

}
