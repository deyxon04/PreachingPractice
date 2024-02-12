import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'button-component',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent  implements OnInit {

  @Input() title: string = ''
  @Input() action: any
  @Input() parameter: any | null = null
  @Input() icon: string| null = null
  @Input() isLoading: boolean = false

  constructor() { }

  ngOnInit() {}

}
