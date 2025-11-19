import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

/**
 * Logger personalizado basado en el logger de Nest.
 * - Permite setear un contexto (ej: nombre de la clase)
 * - Centraliza el formato de logs de la aplicación
 */

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger extends ConsoleLogger {}
