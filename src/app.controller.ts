import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Meeting } from 'src/meeting.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): Meeting {
    return this.appService.getMeeting();
  }
}
