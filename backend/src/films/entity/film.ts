import {
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Schedule } from './schedule';

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column()
  rating: number;

  @Column()
  director: string;

  @Column()
  tags: string;

  @Column()
  image: string;

  @Column()
  cover: string;

  @Column()
  title: string;

  @Column()
  about: string;

  @Column()
  description: string;

  @OneToMany(() => Schedule, (schedule) => schedule.filmId)
  schedule: Schedule[];
}
