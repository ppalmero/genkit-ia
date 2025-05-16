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
  ai.generate('Este es tu promp:hola compañeros como están en este vídeo vamos a ver cómo descargar los driver de la firma digital, para eso nos vamos a la página principal de acá y yo bajo el área de acá ponemos pki san luis, pki.sanluis.gov.ar esta ' +
'firma digital, nos vamos a descargas drivers y aplicaciones y acá vamos a encontrar todos los drivers certificados necesario para que nosotros podemos instalar el token o la cipe necesitemos.'+

'primero que todo bueno tenemos que descargar estos certificados'+
'1- descargar certificados. vamos a ejecutar. ejecutar nuevamente. siguiente. acepto. siguiente. siguiente. Y el certificado se ha instalado correctamente '+
'2- luego descargamos capicom. nos lleva a otra página donde acá abajo dice download (descarga) le damos de nuevo ejecutar, siguiente, le damos a aceptar. Pues no se demora nada tampoco y ya se instaló correctamente.'+
'3- volvemos a la página anterior. Resta instalar java'+

'Es hora de buscar la firma nuestra con qué vamos a firmar, si con las cipe 3.0, con el toquen 5000 o con el token 3000. '+
'Fíjense que se repite dos veces cipe 3.0 de 32 bits y cipe 3.0 de 64 bits y así con el token 5.000 y el token 3000, esto es porque tienen que bajar el driver correcto de acuerdo a los bits de su computadora'+
'¿Cómo vemos eso? minimizamos todo abrimos cualquier carpeta y vamos a mi equipo, desde esta pantalla hacemos clic derecho y en propiedades nos muestra las características de la máquina nuestra. '+
'El tipo de sistema te dice del sistema operativo si es de 64 de 32 bits acá vemos que si la máquina  es de 64 bits entonces lo que voy a hacer si yo quiero descargar en la firma digital por ejemplo de la 3.0 voy a tener que elegir la de 64 bits y descargar'+
'posteriormente ejecutar.'+
'Bueno acá siempre me hace una advertencia le doy a ejecutar de todas maneras e instalo la cipe 3.0 para aquellos que firman con eso'+
'Siempre te pregunta si quieres permitir que este programa realice cambios le damos que si.'+
'bueno yo tengo instalada la cipe como veran acá abajo en el icono correspondiente la cipe 3.0 la lectora omnikey y que es la que usamos todo el mundo.'+
'Vamos a instalar ahora el token 3000 para aquellos que tienen este tipo de firma como dijimos la máquina mía es de 64 bits por eso voy a hacer la descarga del token de 3.000 de 64.'+
'Le doy permitir le damos que si este la forma de instalarlo no se demora más de un minuto, pero como dije anteriormente siempre tengan en cuenta de instalar los drivers y los certificados anteriores y tener actualizado el java como dijimos.'+
'Acá se nos instaló el token 3000. finish y cerramos la pestaña.'+
'Lo vemos acá instalado. El ícono del token 3000 tiene la forma como una mariposa lila y naranja y este sería el ícono correspondiente'+

'Por último vamos a instalar el token 5000. si bien ahora yo estoy instalando todos las firmas, ustedes únicamente tienen que instalar la cipe o el token que corresponda a su firma digital.'+
'No hace falta que instalen los tres. únicamente estoy mostrándoles cómo instalar cada uno, es por eso que hago la descarga de todos.'+
'Éste dice safenetauthenticationClient-x64-10.0.msi. Este es el token 5000.'+
'Gemalto es la marca ponemos next, ponemos spanish, next y acepto. todo siguiente siguiente instalar, es muy intuitivo o sea que es muy fácil de hacerlo.'+

'Bueno lo que tienen token 5000 es que nos pide que reiniciemos la máquina para que nosotros podamos empezar a usar la firma digital o sea que le doy que sí y vamos a ver cómo queda instalada.' +
//'Además, quiero que investigues sobre estas tecnologías y su implementación en la firma digital en la provincia de san luis. Así poder contestar sobre posibles errores que tengan los usuarios.'+
 'La consulta es: por qué tengo un error en los permisos de java?')
      .then(({ text }) => res.json(text))
      .catch(next);
  });

app.listen(port, () => console.log(`Listening on port ${port}`));