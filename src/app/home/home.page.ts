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

  constructor() {
    this.generarOperacion();
  }

  generarOperacion() {
    const num1 = this.numAleatorio(1, 10);
    const num2 = this.numAleatorio(1, 10);
    const operador = this.numAleatorio(1, 4); // 1: suma, 2: resta, 3: multiplicación, 4: división

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
        this.operacion = `${num1} / ${num2}`;
        this.respuestaCorrecta = num1 / num2;
        break;
    }
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
  }
}