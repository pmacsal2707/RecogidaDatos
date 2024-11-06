import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  operacion: string = '';
  respuestaUsuario: number = 0;
  resultado: string | undefined;
  respuestaCorrecta: number | undefined;
  historial: { operacion: string, respuestaUsuario: number, resultado: string }[] = [];
  tiempoLimite: number = 30;
  tiempoRestante: number = this.tiempoLimite;
  intervalo: any;

  constructor() {
    this.generarOperacion();
    this.iniciarTemporizador();
  }

  generarOperacion() {
    const num1 = this.numAleatorio(1, 10);
    const num2 = this.numAleatorio(1, 10);
    const operador = this.numAleatorio(1, 4);

    switch (operador) {
      case 1:
        this.operacion = `${num1} + ${num2}`;
        this.respuestaCorrecta = num1 + num2;
        break;
      case 2:
        this.operacion = `${num1} - ${num2}`;
        this.respuestaCorrecta = num1 - num2;
        break;
      case 3:
        this.operacion = `${num1} * ${num2}`;
        this.respuestaCorrecta = num1 * num2;
        break;
      case 4:
        
        if (num2 === 0) {
          this.generarOperacion();
          return;
        }
        this.operacion = `${num1} / ${num2}`;
        this.respuestaCorrecta = num1 / num2;
        break;
    }

    this.respuestaUsuario = 0;
    this.resultado = undefined;
    this.tiempoRestante = this.tiempoLimite;
  }

  numAleatorio(a: number, b: number) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
  }

  compruebaRespuesta() {
    if (this.respuestaUsuario === this.respuestaCorrecta) {
      this.resultado = '¡Correcto!';
    } else {
      this.resultado = 'Incorrecto. Intenta de nuevo.';
    }
    this.historial.push({
      operacion: this.operacion,
      respuestaUsuario: this.respuestaUsuario,
      resultado: this.resultado
    });
    this.generarOperacion();
  }

  iniciarTemporizador() {
    this.intervalo = setInterval(() => {
      if (this.tiempoRestante > 0) {
        this.tiempoRestante--;
      } else {
        clearInterval(this.intervalo);
        this.resultado = '¡Tiempo agotado!';
        this.historial.push({
          operacion: this.operacion,
          respuestaUsuario: this.respuestaUsuario,
          resultado: this.resultado
        });
        this.generarOperacion();
      }
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalo);
  }
}