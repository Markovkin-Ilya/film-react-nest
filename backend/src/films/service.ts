import { Injectable } from '@nestjs/common';
import { FilmsRepository } from './repository';
import { Film } from './entity/film';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  public async getFilms(): Promise<{ items: Film[] }> {
    const films = await this.filmsRepository.getFilms();
    return { items: films };
  }

  public async getFilmById(id: string) {
    return { items: await this.filmsRepository.getFilmById(id) };
  }
}
