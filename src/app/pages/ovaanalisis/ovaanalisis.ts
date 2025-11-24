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
        this.resultado = data;
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
