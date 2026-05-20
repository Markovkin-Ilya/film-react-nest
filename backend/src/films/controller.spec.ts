import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './controller';
import { FilmsService } from './service';
import { filmFixtures } from './fixtures';
import { FilmsRepository } from './repository';

describe('FilmsController', () => {
  let controller: FilmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService, FilmsRepository],
    })
      .overrideProvider(FilmsRepository)
      .useValue({
        getFilms: jest.fn().mockResolvedValue(filmFixtures.films.items),
        getFilmById: jest.fn().mockResolvedValue(filmFixtures.schedules.items),
      })
      .compile();

    controller = module.get<FilmsController>(FilmsController);
  });

  it('should find films', async () => {
    expect(controller).toBeDefined();
    const result = await controller.getFilms();
    expect(result).toEqual(filmFixtures.films);
  });
  it('should find schedules', async () => {
    expect(controller).toBeDefined();
    const result = await controller.findById(
      '92b8a2a7-ab6b-4fa9-915b-d27945865e39',
    );
    expect(result).toEqual(filmFixtures.schedules);
  });
});
