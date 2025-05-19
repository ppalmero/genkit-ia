import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { genkit } from 'genkit';
import { googleAI, gemini20Flash } from '@genkit-ai/googleai';
import { streamFlow } from 'genkit/beta/client';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PreguntaRespuestaComponent } from "./componentes/pregunta-respuesta/pregunta-respuesta.component";

const url = 'http://localhost:8000/api';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, PreguntaRespuestaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  title = 'genkit-ia';
  count: string = '3';
  characters: any = undefined;
  error?: string = undefined;
  loading: boolean = false;
  
  constructor(private http: HttpClient/*, private authService: AutenticacionService*/) { }

  ngOnInit(): void {
    //this.callFlow();

    /*this.getServer().subscribe(dataClientes => {
      console.log("Respuesta: "  + dataClientes);
    })*/

  }

  getServer(): Observable<string>{
    return this.http.get<string>(url);
  }
  
  async callFlow() {
    try {
      const response = streamFlow({url, input: parseInt(this.count),});
      for await (const chunk of response.stream) {
        this.characters = (chunk);
      }
      this.loading = (false);
    } catch (e) {
      this.loading = false;
      if ((e as any).cause) {
        this.error = `${(e as any).cause}`;
      } else {
        this.error = `${e}`;
      }
    }
  }
}
