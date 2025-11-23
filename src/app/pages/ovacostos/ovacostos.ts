import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ovacostos',
  standalone: true,
  imports: [RouterModule, HttpClientModule, FormsModule, CommonModule],
  templateUrl: './ovacostos.html',
  styleUrl: './ovacostos.css',
})
export class Ovacostos implements OnInit, OnDestroy {
  cfijo: number | null = null;
  cvariable: number | null = null;
  cindirecto: number | null = null;
  unidades: number | null = null;
  margen: number | null = null;
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
    // Validate all fields are provided
    if (
      this.cfijo === null ||
      this.cvariable === null ||
      this.cindirecto === null ||
      this.unidades === null ||
      this.margen === null
    ) {
      this.error = 'Por favor completa todos los campos antes de calcular.';
      return;
    }

    const url = `http://localhost:8094/api/costos-jni/calcular?cfijo=${this.cfijo}&cvariable=${this.cvariable}&cindirecto=${this.cindirecto}&unidades=${this.unidades}&margen=${this.margen}`;

    this.http.get(url).subscribe({
      next: (data) => {
        this.resultado = data;
      },
      error: (error) => {
        console.error('Error al calcular:', error);
        this.error = 'No se pudo conectar con el microservicio. Verifica que esté corriendo en el puerto 8081.';
      },
    });
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll as EventListener);
  }

  goBack() { this.router.navigate(['/home-ova']); }

  reset() {
    this.cfijo = null;
    this.cvariable = null;
    this.cindirecto = null;
    this.unidades = null;
    this.margen = null;
    this.resultado = null;
    this.error = '';
  }
}
