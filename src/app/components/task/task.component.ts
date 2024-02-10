import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'task-component',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  animations: [
    trigger('disappear', [
      state('visible', style({
        display: 'block',
        opacity: 1,
        height: '*'
      })),
      state('hidden', style({
        opacity: 0,
        height: '0',
        display: 'none'
      })),
      transition('visible => hidden', [
        animate('1s')
      ]),
      transition('hidden => visible', [
        animate('1s')
      ])
    ])
  ]
})
export class TaskComponent implements OnInit {

  @Input() results: any
  @Input() contents: any
  @Input() filterPlayers: Array<string> = []
  @Input() repeat: boolean = true
  @Input() help: Function | null = null
  @Input() resetResult: Function | null = null

  content: any = {}

  // Variables del entorno
  listVisible: string = 'hidden'
  buttonVisible: string = 'hidden'
  buttonLoading: boolean = false

  constructor(
  ) {
    this.buttonVisible = 'visible'
  }

  async ngOnInit() {

  }

  ionViewWillEnter() {
  }

  taskAssign = () => {
    this.content['site'] = this.contents['sites'][Math.floor(Math.random() * this.contents['sites'].length)]
    this.content['situation'] = this.contents['situations'][Math.floor(Math.random() * this.contents['situations'].length)]
    this.content['teme'] = this.contents['temes'][Math.floor(Math.random() * this.contents['temes'].length)]
    if (!this.repeat) this.filterPlayers.push(this.results.player)

    // Animations
    this.buttonLoading = true
    setTimeout(() => {
      this.listVisible = 'visible'
    }, 1000);
    setTimeout(() => {
      this.buttonVisible = 'hidden'
    }, 2000);
    setTimeout(() => {
      if (this.help) this.help(`Excelente ${this.results.player}!, ahora resuelve el tema, mucho exito. Cuando termines puedes volver a lanzar el dado para que otro participante tambien tenga oportunidad.`)
    }, 3000);
  }


}
