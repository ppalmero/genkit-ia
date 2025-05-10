import express from 'express';

const app = express();
const port = process.env.SERVER_PORT || 8000;

import { genkit } from 'genkit';
import { googleAI, gemini20Flash } from '@genkit-ai/googleai';

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api", (req, res, next) => {
	const ai = genkit({
    plugins: [googleAI({ apiKey: "k" })],
    model: gemini20Flash, // Set default model
  });
  //res.json("Hello");
  ai.generate('puedes hablarme de padel?')
      .then(({ text }) => res.json(text))
      .catch(next);
  });

app.listen(port, () => console.log(`Listening on port ${port}`));