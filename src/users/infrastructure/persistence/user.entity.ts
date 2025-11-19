import { Column, Entity, PrimaryColumn } from 'typeorm';

/**
 * Entidad de persistencia para TypeORM.
 * - Mapea la tabla "users" de la base de datos
 * - Puede tener detalles específicos de infraestructura (decoradores, nombres de columnas, etc.)
 */
@Entity('users')
export class UserEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;
}
