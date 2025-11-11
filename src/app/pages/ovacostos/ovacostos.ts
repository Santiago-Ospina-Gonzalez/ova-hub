import { Component } from '@angular/core';
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
export class Ovacostos {
  cfijo: number = 0;
  cvariable: number = 0;
  cindirecto: number = 0;
  unidades: number = 0;
  margen: number = 0;
  resultado: any = null;

  constructor(private http: HttpClient) {}

  calcular() {
    const url = `http://localhost:8094/api/costos-jni/calcular?cfijo=${this.cfijo}&cvariable=${this.cvariable}&cindirecto=${this.cindirecto}&unidades=${this.unidades}&margen=${this.margen}`;

    this.http.get(url).subscribe({
      next: (data) => {
        this.resultado = data;
      },
      error: (error) => {
        console.error('Error al calcular:', error);
        alert('No se pudo conectar con el microservicio. Verifica que esté corriendo.');
      },
    });
  }
}
