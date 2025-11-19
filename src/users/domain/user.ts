import { randomUUID } from 'crypto';

/**
 * Entidad de dominio User.
 * - Representa al usuario dentro del dominio (no depende de Nest ni de TypeORM)
 * - Almacena el hash de la contraseña, no la contraseña en texto plano
 */

export class User {
  constructor(
    public readonly id: string,
    public username: string,
    public email: string,
    public passwordHash: string,
  ) {}

  /**
   * Factory de dominio para crear un nuevo usuario.
   * - Genera un UUID
   * - Recibe ya la contraseña hasheada (passwordHash)
   */
  static create(params: {
    username: string;
    email: string;
    passwordHash: string;
  }): User {
    return new User(
      randomUUID(),
      params.username,
      params.email,
      params.passwordHash,
    );
  }
}
