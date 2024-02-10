import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations'

@Component({
  selector: 'dice-component',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss'],
  animations: [
    trigger('rotation', [
      state('normal', style({
        transform: 'rotateX(-5deg) rotateY(-5deg)'
      })),
      state('rotate', style({
        transform: 'rotateX(-1795deg) rotateY(275deg)'
      })),
      transition('normal => rotate', animate('2s ease-out')),
      transition('rotate => normal', animate('2s ease-out'))
    ]),
    trigger('disappear', [
      state('visible', style({
        opacity: 1,
        height: '*',
        display: 'block'
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
export class DiceComponent implements OnInit, AfterViewInit {

  /** Variables de entrada */
  @Input() players: Array<string> = []
  @Input() filterPlayers: Array<string> = []
  @Input() callback: Function | null = null
  @Input() results: any
  @Input() repeat: boolean = true
  @Input() help: Function | null = null

  /** Configuracion de entorno */
  diceState: string = 'normal';
  isVisible: string = 'visible';
  private diceContent: any;
  private dice: any;
  private faces: any;
  private isLocked: boolean = false
  /** Variables del juego */
  private facesMapping: Array<any> = []

  constructor(
  ) {
  }

  ngOnInit() {
  }

  /** Asignacion de elementos del DOM despues de cargar el componente */
  ngAfterViewInit() {
    this.diceContent = document.getElementById('diceContent')
    this.dice = document.getElementById('dice')
    this.faces = Array.from(document.getElementsByClassName('face'))
  }

  /** Animacion de rotacion del dado 3D y asignacion aleatoria de caras para el mismo */
  diceRotate() {
    if (this.players.length == 0 || this.isLocked) return

    this.results['player'] = null
    this.diceState = (this.diceState === 'normal') ? 'rotate' : 'normal';
    if (this.help) this.help('¿Preparados?...')
    setTimeout(() => {
      if (this.help) this.help('Ahí va!!!...')
    }, 1000);

    // Asigno las caras del dado, el resultado y la animacion
    if (this.setFacesMapping(this.players)) {
      const result = this.diceState == 'rotate' ? this.facesMapping[4].name : this.facesMapping[0].name
      setTimeout(() => {
        if (this.help) this.help(`Muy bien!, ahora, asigna la tarea de ${result}.`)
      }, 2000);
      setTimeout(() => {
        this.isVisible = 'hidden'
      }, 3000);
      setTimeout(() => {
        this.results['player'] = result
      }, 4000);
    } else {
      if (this.help) this.help('Todos los jugadores han participado, puedes reiniciar el filtro o agregar más participantes')
    }

    this.isLocked = true

  }

  /**
   * Asigna aleatoriamente el array facesMapping para renderizar el dado y el resultado
   * @param players$ Array de jugadores desde game.page
   */
  setFacesMapping(players$: Array<any>): boolean {
    let players
    if (!this.repeat) {
      players = [...players$.filter(item => !this.filterPlayers.includes(item))].sort(() => { return Math.random() - 0.5 }).slice(0, 6)
    } else {
      players = [...players$].sort(() => { return Math.random() - 0.5 }).slice(0, 6)
    }
    if (players.length == 0) return false// cancelar si el el nuevo array esta vacio

    let ind = 0
    this.facesMapping = []

    for (let i = 0; i <= 5; i++) {
      if (!players[ind]) ind = 0
      this.facesMapping[i] = { name: players[ind] }
      this.faces[i].innerText = players[ind]
      ind++
    }
    return true
  }


}
