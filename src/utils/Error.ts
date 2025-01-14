import { HttpException } from '@nestjs/common';

export class ErrorException extends HttpException {
  constructor(message: string, status: number) {
    super(message, status);
  }
}
