import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Film } from '../films/entity/film';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from '../films/entity/schedule';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  public async createOrder(item) {
    const schedule = await this.scheduleRepository.find({
      where: { id: item.session },
      select: { taken: true },
    });
    if (schedule && schedule.length > 0) {
      const taken = schedule[0].taken;
      const newSeat = `,${item.row}:${item.seat}`;
      const newTaken = taken + newSeat;
      this.scheduleRepository.update({ id: item.session }, { taken: newTaken });
    }
  }

  public async checkSeats(ticket) {
    try {
      const film = await this.filmsRepository.find({
        where: { id: ticket.film },
      });
      if (!film) {
        throw new HttpException(
          'Фильма с таким id не существует',
          HttpStatus.NOT_FOUND,
        );
      }
      const schedule = await this.scheduleRepository.find({
        where: { id: ticket.session },
      });
      if (!schedule || schedule.length <= 0) {
        throw new HttpException(
          'Сеанса с таким id не существует',
          HttpStatus.NOT_FOUND,
        );
      }
      if (
        schedule[0].rows < ticket.row ||
        schedule[0].seats < ticket.seat ||
        1 > ticket.row ||
        1 > ticket.seat
      ) {
        throw new HttpException(
          'Выбранных вами мест не существует',
          HttpStatus.BAD_REQUEST,
        );
      }
      const seat = `${ticket.row}:${ticket.seat}`;
      const regex = new RegExp(`(^|,)\\s*${seat}\\s*(,|$)`, 'i');
      const isFound = regex.test(schedule[0].taken);
      if (isFound) {
        throw new HttpException(
          'Выбранные места уже заняты',
          HttpStatus.CONFLICT,
        );
      }
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          error instanceof Error
            ? error.message
            : 'Произошла непредвиденная ошибка',
      };
    }
  }
}
