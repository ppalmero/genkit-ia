import { Component, SecurityContext } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

const url = 'http://localhost:8000/api';
interface Mensaje {
  rol: 'Usuario' | 'Asistente';
  contenido: string;
}

@Component({
  selector: 'app-pregunta-respuesta',
  templateUrl: './pregunta-respuesta.component.html',
  styleUrls: ['./pregunta-respuesta.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, NgClass]
})


export class PreguntaRespuestaComponent {
  pregunta: string = '';
  historialConversacion: Mensaje[] = [];
  respuesta: string = '';
  error: string = '';
  cargando: boolean = false;
  userId: string = 'usuario-temporal-1'; // ¡En una app real, esto sería una sesión o ID único!

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    // Podrías cargar el historial existente al inicializar el componente
    this.cargarHistorial();
  }

  async cargarHistorial() {
    // Implementa una llamada al backend para obtener el historial del usuario
    // Si decides implementar esto
  }

  async enviarPregunta() {
    if (this.pregunta.trim() === '') {
      return;
    }

    this.cargando = true;
    this.respuesta = '';
    this.error = '';

    this.historialConversacion.push({ rol: 'Usuario', contenido: this.pregunta });

    const apiUrl = `http://localhost:8000/api/conversacion/${this.userId}`;
    const payload = { pregunta: this.pregunta };

    try {
      const response: any = await this.http.post(apiUrl, payload).toPromise();
      this.respuesta = this.interpretarMarkdown(response.respuesta);
      this.historialConversacion.push({ rol: 'Asistente', contenido: this.respuesta });
      this.pregunta = '';
      this.cargando = false;
    } catch (error: any) {
      this.error = 'Ocurrió un error en la conversación.';
      console.error('Error:', error);
      this.cargando = false;
      this.historialConversacion.pop();
    }
  }

   interpretarMarkdown(texto: string): string {
    let resultado = texto;

    // Negrita
    resultado = resultado.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Cursiva
    resultado = resultado.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Viñetas (asterisco al inicio de la línea)
    resultado = resultado.replace(/^(\*)\s+(.*)$/gm, '<li>$2</li>');

    // Envolver las viñetas en una lista ul (si hay al menos una viñeta)
    if (resultado.includes('<li>')) {
      resultado = '<ul>' + resultado + '</ul>';
    }

    return this.sanitizer.sanitize(SecurityContext.HTML, resultado) || '';
  }

  // La plantilla HTML sería similar a la estrategia 1
}