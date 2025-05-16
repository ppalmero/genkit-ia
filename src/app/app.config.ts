import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideFirebaseApp(() => initializeApp({"projectId":"angular-4e797","appId":"1:845735969236:web:98d133ea8776217d271641","databaseURL":"https://angular-4e797-default-rtdb.firebaseio.com","storageBucket":"angular-4e797.firebasestorage.app","apiKey":"AIzaSyBsyAl4KhKka8IfVmGHfsTrLdRKzvdhDTU","authDomain":"angular-4e797.firebaseapp.com","messagingSenderId":"845735969236"})), provideFirestore(() => getFirestore())]
};
