import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

/**
 * Servicio de utilidades para hashear y comparar contraseñas.
 * - Usa bcrypt internamente
 * - Nunca se expone al exterior (solo se usa en la capa de aplicación)
 */
@Injectable()
export class passwordHasher {
  private readonly saltRounds = 10;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
