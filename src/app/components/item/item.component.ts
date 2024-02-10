import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'item-component',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent  implements OnInit {

  @Input() label: any
  @Input() text: any
  @Input() action: any
  @Input() actionTitle: any
  @Input() parameters: any

  constructor() { }

  ngOnInit() {}

}
