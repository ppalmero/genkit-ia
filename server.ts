import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import { genkit } from 'genkit';
import { googleAI, gemini20Flash } from '@genkit-ai/googleai';
import cors from 'cors';
const config = require('./config');
// The Express app is exported so that it can be used by serverless Functions.

const corsOptions = {
  origin: 'http://localhost:4200' // Reemplaza con el origen de tu aplicación Angular
};

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);
  /*server.use(cors(
    config.application.cors.server
  ));*/

  server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Reemplaza con el origen de tu Angular
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Métodos HTTP permitidos
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Encabezados permitidos
    res.setHeader('Access-Control-Allow-Credentials', 'false'); // Si necesitas manejar cookies o autenticación
  
    // Manejo de la solicitud OPTIONS (preflight)
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });
  // Initialize Genkit
  const ai = genkit({
    plugins: [googleAI({ apiKey: "k" })],
    model: gemini20Flash, // Set default model
  });

  // Create an API return the output of the prompt to the client
  server.get('/api/ai', (req, res, next) => {
    // Simple generation
    ai.generate('Why is AI awesome?')
      .then(({ text }) => res.json(text))
      .catch(next);
  });

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });


  return server;
}

function run(): void {
  const port = /*process.env['PORT'] ||*/ 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
