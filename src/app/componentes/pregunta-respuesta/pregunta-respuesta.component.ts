import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { Observable } from 'rxjs';

const url = 'http://localhost:8000/api';

@Component({
  selector: 'app-pregunta-respuesta',
  templateUrl: './pregunta-respuesta.component.html',
  styleUrls: ['./pregunta-respuesta.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf]
})
export class PreguntaRespuestaComponent {
  pregunta: string = '';
  respuesta: string = '';
  error: string = '';
  cargando: boolean = false;

  constructor(private http: HttpClient) { }

  enviarPregunta() {
    if (this.pregunta.trim() === '') {
      return; // No enviar si la pregunta está vacía
    }

    this.cargando = true;
    this.respuesta = '';
    this.error = '';

    // Reemplaza 'TU_ENDPOINT_DEL_SERVIDOR' con la URL real de tu API
    //const apiUrl = 'TU_ENDPOINT_DEL_SERVIDOR';
    //const payload = { pregunta: this.pregunta };

    this.getServer().subscribe(dataClientes => {
      this.respuesta = dataClientes;
    })

    /*this.http.post<any>(apiUrl, payload)
      .subscribe({
        next: (data) => {
          this.respuesta = data.respuesta; // Asume que la respuesta viene en un campo llamado 'respuesta'
          this.cargando = false;
          this.pregunta = ''; // Limpiar el campo de pregunta después de enviar
        },
        error: (error) => {
          this.error = 'Ocurrió un error al obtener la respuesta.';
          console.error('Error:', error);
          this.cargando = false;
        }
      });*/
  }

  getServer(): Observable<string>{
      return this.http.get<string>(url);
    }
}