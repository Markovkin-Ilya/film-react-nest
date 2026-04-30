import { Injectable } from '@nestjs/common';
import { Film } from './entity/film';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entity/schedule';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  public async getFilms(): Promise<Film[]> {
    return this.filmsRepository.find();
  }

  async getFilmById(id): Promise<Schedule[]> {
    return this.scheduleRepository.find({
      where: { filmId: id },
      order: { daytime: 'ASC' },
    });
  }
}
