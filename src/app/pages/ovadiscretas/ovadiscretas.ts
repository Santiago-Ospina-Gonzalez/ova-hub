import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ovadiscretas',
  standalone: true,
  imports: [RouterModule, HttpClientModule, FormsModule, CommonModule],
  templateUrl: './ovadiscretas.html',
  styleUrl: './ovadiscretas.css',
})
export class Ovadiscretas implements OnInit, OnDestroy {
  conjuntoA: string = '';
  conjuntoB: string = '';
  operacion: string = 'union';
  resultado: any = null;
  error: string = '';
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

  constructor(private http: HttpClient, private router: Router) {}

  calcular() {
    this.error = '';
    this.resultado = null;

    // Convertir strings a arrays de números
    const arrayA = this.parseConjunto(this.conjuntoA);
    const arrayB = this.parseConjunto(this.conjuntoB);

    if (arrayA === null || arrayB === null) {
      this.error = 'Por favor ingresa conjuntos válidos (números separados por comas)';
      return;
    }

    let url = '';
    let body = {};

    switch (this.operacion) {
      case 'union':
        url = 'http://localhost:8081/api/conjuntos-jni/union';
        body = { a: arrayA, b: arrayB };
        break;
      case 'interseccion':
        url = 'http://localhost:8081/api/conjuntos-jni/interseccion';
        body = { a: arrayA, b: arrayB };
        break;
      case 'diferencia':
        url = 'http://localhost:8081/api/conjuntos-jni/diferencia';
        body = { a: arrayA, b: arrayB };
        break;
      case 'diferencia-ba':
        url = 'http://localhost:8081/api/conjuntos-jni/diferencia';
        body = { a: arrayB, b: arrayA };
        break;
    }

    this.http.post(url, body).subscribe({
      next: (data) => {
        this.resultado = data;
      },
      error: (error) => {
        console.error('Error al calcular:', error);
        this.error = 'No se pudo conectar con el microservicio. Verifica que esté corriendo en el puerto 8081.';
      },
    });
  }

  parseConjunto(str: string): number[] | null {
    if (!str.trim()) return null;
    
    try {
      const nums = str.split(',').map(s => {
        const num = parseInt(s.trim());
        if (isNaN(num)) throw new Error('Invalid number');
        return num;
      });
      return nums;
    } catch {
      return null;
    }
  }

  reset() {
    this.conjuntoA = '';
    this.conjuntoB = '';
    this.operacion = 'union';
    this.resultado = null;
    this.error = '';
  }

  goBack() { this.router.navigate(['/home-ova']); }

  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll as EventListener);
  }
}
