import { Injectable } from '@nestjs/common';
import { Meeting, StatusEnum } from 'src/meeting.entity';

@Injectable()
export class AppService {
  getMeeting(): Meeting {
    const meeting = new Meeting();
    meeting.name = 'name';
    meeting.status = StatusEnum.APPROVED;

    return meeting;
  }
}
