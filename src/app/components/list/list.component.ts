import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent  implements OnInit {

  @Input() items: Array<string> = []
  @Input() remove: any

  constructor() { }

  ngOnInit() {}

  /**
   * Remueve el item del array
   * @param index indice de item
   */
  removeItem(index: any): void {
    this.items.splice(index,1)
  }

}
