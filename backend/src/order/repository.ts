import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilmDocument, Film } from '../films/schema';
import { Model } from 'mongoose';

@Injectable()
export class OrderRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  public async createOrder(item) {
    const newSeat = `${item.row}:${item.seat}`;
    await this.filmModel.updateOne(
      { id: item.film, 'schedule.id': item.session },
      { $push: { 'schedule.$.taken': newSeat } },
    );
  }

  public async checkSeats(ticket) {
    try {
      const film = await this.filmModel.findOne({ id: ticket.film });
      if (!film) {
        throw new HttpException(
          'Фильма с таким id не существует',
          HttpStatus.NOT_FOUND,
        );
      }
      const schedule = film.schedule.find((session) => {
        return session.id == ticket.session;
      });
      if (!schedule) {
        throw new HttpException(
          'Сеанса с таким id не существует',
          HttpStatus.NOT_FOUND,
        );
      }
      if (
        schedule.rows < ticket.row ||
        schedule.seats < ticket.seat ||
        1 > ticket.row ||
        1 > ticket.seat
      ) {
        throw new HttpException(
          'Выбранных вами мест не существует',
          HttpStatus.BAD_REQUEST,
        );
      }
      const seat = `${ticket.row}:${ticket.seat}`;
      if (schedule.taken.includes(seat)) {
        throw new HttpException(
          'Выбранные места уже заняты',
          HttpStatus.CONFLICT,
        );
      }
    } catch (error: unknown) {
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
