export class CreatOrderDto {
  email: string;
  phone: string;
  taken: TakenDTO[];
}

interface TakenDTO {
  day: string;
  daytime: string;
  film: string;
  price: number;
  row: number;
  seat: number;
  session: string;
  time: string;
}
