import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  formatMessage(level: string, message: any, ...optionalParams: any[]) {
    const optional = optionalParams
      ? `optional=${JSON.stringify(optionalParams)}`
      : '';
    return [
      `level=${level}`,
      `message=${message.replace(/\t/g, '')}`,
      `${optional}`,
    ]
      .filter((data) => data)
      .join('\t');
  }
  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, optionalParams));
  }
  fatal(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('fatal', message, optionalParams));
  }
  error(message: any, trace?: string, ...optionalParams: any[]) {
    console.error(
      this.formatMessage('error', message, optionalParams, { trace }),
    );
  }
  warn(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('warn', message, optionalParams));
  }
}
