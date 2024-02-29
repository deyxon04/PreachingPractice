import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'timer-component',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, AfterViewInit {

  @Input() time: any = {
    hours: 0,
    minuts: 0,
    seconds: 0
  }

  /** Variables de entorno */
  public hours: number = 0
  public minuts: number = 0
  public seconds: number = 0
  timer: any = null
  animation: string = ''
  alarmActive: boolean = true
  alarm: any = null

  constructor() {
  }
  
  ngOnInit() {}
  
  /** Siclo de vida AfterInit */
  async ngAfterViewInit() {
    this.alarm = <HTMLAudioElement>document.getElementById('alarm');
    await this.reset()
    this.start()
  }

  /** Siclo de vida OnDestroy */
  ngOnDestroy() {
    this.finish()
  }

  /** Pausa el timer */
  pause(): void {
    this.finish()
  }

  /** Restaura los valores originales del timer */
  async reset(): Promise<void> {
    this.finish()
    this.setAnimation(false)
    this.hours = this.time.hours
    this.minuts = this.time.minuts
    this.seconds = this.time.seconds
  }
  /** Inicia el timer */
  start(): void {
    if (this.hours === 0 && this.minuts === 0 && this.seconds === 0) return
    if (!this.timer) this.timer = this.getTimer()
  }

  /** Reduce el tiempo en 1 segundo */
  reducer(): void {
    if (this.seconds > 0) {
      this.seconds--
    } else {
      if (this.minuts > 0) {
        this.seconds = 59
        this.minuts--
      } else if (this.hours > 0) {
        this.seconds = 59
        this.minuts = 59
        this.hours--
      } else {
        this.finish()
        this.setAnimation(true)
      }
    }
  }

  /** Finaliza el timer y setea la variable timer en null */
  finish(): void {
    clearInterval(this.timer)
    this.timer = null
  }

/**
 * Crea y devuelve un setInterval de 1s llamando al metodo reducer
 * @returns {any} intervalo de 1s llamando al metodo reducer
 */
  getTimer(): any {
    return setInterval(() => {
      this.reducer()
    }, 1000);
  }

  /** Setea la animacion del timer */
  setAnimation(isActive = false): void {
    if (isActive) {
      this.animation = 'shake'
      if (this.alarmActive) this.playAlarm()
    }
    if (!isActive) {
      this.animation = ''
      if (this.alarmActive) this.stopAlarm()
    } 
  }

  /** Reproduce el sonido de alarma */
  playAlarm(): void {
    this.alarm.src = '../../../assets/audio/alarm.mp3';
    this.alarm.play();
  }

  /** Detiene el sonido de alarma */
  stopAlarm(): void {
    this.alarm.pause();
    this.alarm.currentTime = 0;
  }

}
