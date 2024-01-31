import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-component',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent  implements OnInit {

  @Input() imageSrc: any = ''
  @Input() title: any = ''

  constructor() { }

  ngOnInit() {}

}
