import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { message: string } {
    return {
      message:
        'This is not a valid route. Please refer to the documentation for the correct routes.',
    };
  }
}
