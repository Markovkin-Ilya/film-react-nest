import {
  Entity,
  Generated,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Film } from './film';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column()
  daytime: string;

  @Column()
  hall: number;

  @Column()
  rows: number;

  @Column()
  seats: number;

  @Column()
  price: number;

  @Column()
  taken: string;

  @Column()
  @Generated('uuid')
  filmId: string;

  @ManyToOne(() => Film, (film) => film.id)
  film: Film;
}
