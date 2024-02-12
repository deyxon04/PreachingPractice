import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'input-component',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent  implements OnInit {

  @Input() id: string = ''
  @Input() type: string = 'text'
  @Input() model: any
  @Input() placeholder: string = 'Ingresa nuevo ...'
  @Input() action: any 
  @Input() parameter: string = ''
  @Input() icon: string | null = null
  @Input() count: number = 20

  inputModel: string = ''

  constructor() { }

  ngOnInit() {}

  addItem() {
    const input = document.getElementById(this.id)
    if (this.inputModel.trim() === '' ) {
      input?.focus()
      return alert('Los campos no deben estar vacios')
    }
    this.action(this.parameter, this.inputModel)
    this.inputModel = ''
    input?.focus()
  }
}
