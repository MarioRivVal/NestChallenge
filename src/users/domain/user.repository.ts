import { User } from './user';

/**
 * Token de inyección de dependencias para el puerto IUserRepository.
 * Se usa en el módulo para enlazar con la implementación concreta.
 */
export const USER_REPOSITORY = 'USER_REPOSITORY';

/**
 * Puerto de dominio para el repositorio de usuarios.
 * Define las operaciones que la capa de aplicación necesita para trabajar con Users,
 * sin conocer los detalles de persistencia (DB, TypeORM, etc.).
 */
export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}
