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
        animate('0s')
      ]),
      transition('hidden => visible', [
        animate('1s')
      ])
    ])
  ]
})
export class TaskComponent implements OnInit {

  @Input() gameStatus: any
  @Input() contents: any
  @Input() players: Array<string> = []
  @Input() filterPlayers: Array<string> = []
  @Input() repeat: boolean = true
  @Input() setHelpMsg!: Function
  @Input() setState!: Function
  @Input() allPlayersFinished!: Function

  content: any = {}

  // Variables del entorno
  listVisible: string = 'hidden'
  buttonVisible: string = 'hidden'
  buttonLoading: boolean = false
  isLocked: boolean = false

  constructor() {}
  
  /** Siclo de vida onInit */
  async ngOnInit() {
    this.buttonVisible = 'visible'
  }

  /**
   * Asigna la tarea correspondiente al participante seleccionado y lo agrega a la lista de filtro
   * @returns {void}
   */
  taskAssign = () => {
    if (this.isLocked) return
    this.listVisible = 'hidden'

    this.gameStatus.site = this.contents['sites'][Math.floor(Math.random() * this.contents['sites'].length)]
    this.gameStatus.situation = this.contents['situations'][Math.floor(Math.random() * this.contents['situations'].length)]
    this.gameStatus.teme = this.contents['temes'][Math.floor(Math.random() * this.contents['temes'].length)]
    if (!this.repeat) this.filterPlayers.push(this.gameStatus.player)

    // Animations
    this.buttonLoading = true
    setTimeout(() => {
      this.listVisible = 'visible'
    }, 500);
    setTimeout(() => {
    this.isLocked = false
    this.buttonLoading = false
    }, 2000);
    setTimeout(() => {
      if (this.gameStatus.state === 'task') this.setHelpMsg(`Excelente ${this.gameStatus.player}!, ahora resuelve el tema, mucho exito. Cuando termines puedes volver a lanzar el dado para que otro participante tambien tenga oportunidad.`)
      this.gameStatus.state = 'timer'
    }, 2100);

    this.isLocked = true
  }

  /**
   * Setea el state a 'finish' si todos los players participaron o a 'dice' si todavia faltan
   * @returns {void}
   */
  newRelease = () => {
    this.allPlayersFinished() ? this.setState('finish') : this.setState('dice')
  }


}
