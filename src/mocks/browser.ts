//  msw browser setup para el front
import { setupWorker } from 'msw/browser'; // para navegador
import { handlers } from './handlers';

// Configura el worker del navegador
export const worker = setupWorker(...handlers);
