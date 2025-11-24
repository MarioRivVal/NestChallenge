import { ConsoleLogger, Injectable } from '@nestjs/common';

/**
 * Logger personalizado basado en el logger de Nest.
 * - Permite setear un contexto (ej: nombre de la clase)
 * - Centraliza el formato de logs de la aplicación
 */

@Injectable()
export class CustomLogger extends ConsoleLogger {}
