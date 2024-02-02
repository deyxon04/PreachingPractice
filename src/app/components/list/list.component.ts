import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent  implements OnInit {

  @Input() items: Array<any> = []
  @Input() listName: string = ''
  @Input() removeItem: any

  constructor() { }

  ngOnInit() {}

}
