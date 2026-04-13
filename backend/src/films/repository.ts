import { Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Film, FilmDocument } from './schema';

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async getFilms(): Promise<Film[]> {
    return this.filmModel.find();
  }

  async getFilmById(filmFilterQuery: FilterQuery<Film>): Promise<Film> {
    return this.filmModel.findOne(filmFilterQuery);
  }
}
