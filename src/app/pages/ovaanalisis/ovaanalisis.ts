import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ovaanalisis',
  standalone: true,
  imports: [RouterModule, HttpClientModule, FormsModule, CommonModule],
  templateUrl: './ovaanalisis.html',
  styleUrl: './ovaanalisis.css',
})
export class Ovaanalisis implements OnInit, OnDestroy {
  private lastScroll = 0;
  private onScroll = () => {
    const header = document.getElementById('header');
    if (!header) return;
    const current = window.scrollY || window.pageYOffset;
    if (current > this.lastScroll && current > 60) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }
    this.lastScroll = current;
  };

  constructor(private router: Router, private http: HttpClient) {}
  goBack() { this.router.navigate(['/home-ova']); }

  // Form fields
  x1: number | null = null;
  x2: number | null = null;
  funcion: string = '';
  tolerancia: number | null = null;
  metodo: string = 'Bisección';

  resultado: any = null;
  error: string = '';
  errorCode: number | null = null;
  errorTitle: string = '';
  errorDescription: string = '';
  errorHelp: string = '';

  // Error mappings (codes -> messages)
  private ERROR_TITLES: Record<number, string> = {
    0: 'Éxito - Evaluación completada correctamente',
    1: 'Error de análisis - Sintaxis incorrecta en la expresión',
    2: 'Error de evaluación matemática - Operación no válida',
    3: 'Múltiples variables detectadas - Solo se permite una variable',
    4: 'Error de memoria - No se pudo asignar memoria',
    5: 'Error bisección - Ambos extremos del intervalo tienen el mismo signo',
    6: 'Error bisección - El extremo superior no es mayor que el inferior'
  };

  private ERROR_DESCRIPTIONS: Record<number, string> = {
    0: 'La expresión se evaluó correctamente',
    1: 'Revise la sintaxis de la expresión matemática',
    2: 'Operación matemática no válida para los valores dados',
    3: 'Use solo una variable (x, y, z, etc.) en la expresión',
    4: 'Error interno del sistema',
    5: 'No hay cambio de signo en los extremos; el método de bisección no aplica',
    6: 'El segundo parámetro debe ser mayor que el primero para aplicar bisección'
  };

  private ERROR_HELP: Record<number, string> = {
    1: 'Verifique paréntesis, operadores y funciones válidas',
    2: 'Evite divisiones por cero, raíces negativas, logaritmos no positivos',
    3: 'Ejemplos válidos: "x^2", "2*x+1", "sin(x)" - Ejemplo inválido: "x+y"',
    4: 'Reinicie la aplicación o reduzca la complejidad de la expresión',
    5: 'Asegúrese de que f(a) y f(b) tengan signos opuestos antes de llamar a la bisección',
    6: 'Intercambie los parámetros o corrija el orden: use (a,b) con b > a'
  };

  calcular() {
    this.error = '';
    this.resultado = null;

    if (this.x1 === null || this.x2 === null || !this.funcion) {
      this.error = 'Por favor ingresa x1, x2 y la función a evaluar.';
      return;
    }

    const url = 'http://localhost:9090/api/biseccion_service/Evaluar';
    const body = {
      x1: String(this.x1),
      x2: String(this.x2),
      funcion: this.funcion
    };

    this.http.post(url, body).subscribe({
      next: (data: any) => {
        // Expecting an array [raiz, iteraciones, codigo]
        this.resultado = null;
        this.error = '';
        this.errorCode = null;
        this.errorTitle = '';
        this.errorDescription = '';
        this.errorHelp = '';

        if (Array.isArray(data) && data.length >= 3) {
          const code = Number(data[2]);
          if (code === 0) {
            this.resultado = data;
          } else {
            this.errorCode = isNaN(code) ? null : code;
            this.errorTitle = this.ERROR_TITLES[code] || ('Error código: ' + code);
            this.errorDescription = this.ERROR_DESCRIPTIONS[code] || '';
            this.errorHelp = this.ERROR_HELP[code] || '';
            this.error = this.errorTitle;
          }
        } else {
          // Unknown response format
          this.error = 'Respuesta inesperada del servicio.';
        }
      },
      error: (err) => {
        console.error('Error al calcular bisección:', err);
        this.error = 'No se pudo conectar con el microservicio. Verifica que esté corriendo en el puerto 9090.';
      }
    });
  }

  reset() {
    this.x1 = null; this.x2 = null; this.funcion = ''; this.tolerancia = null; this.resultado = null; this.error = '';
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll as EventListener);
  }
}
