import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}
  @Get()
  async getFilms() {
    return this.filmsService.getFilms();
  }

  @Get('/:id/schedule')
  async findById(@Param('id') id: string) {
    return this.filmsService.getFilmById(id);
  }
}
