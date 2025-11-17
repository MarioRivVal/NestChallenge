import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
