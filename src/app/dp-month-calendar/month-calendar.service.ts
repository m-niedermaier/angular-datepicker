import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {UtilsService} from '../common/services/utils/utils.service';
import {IMonth} from './month.model';
import {ICalendarMonthConfig} from '../dp-day-calendar/day-calendar-config.model';

@Injectable()
export class MonthCalendarService {
  constructor(private utilsService: UtilsService) {
  }

  generateYear(year: Moment, selected: Moment = null): IMonth[][] {
    const index = year.clone().startOf('year');

    return this.utilsService.createArray(3).map(() => {
      return this.utilsService.createArray(4).map(() => {
        const month = {
          date: index.clone(),
          selected: index.isSame(selected, 'month'),
          currentMonth: index.isSame(moment(), 'month')
        };

        index.add(1, 'month');
        return month;
      });
    });
  }

  isDateDisabled(month: IMonth, config: ICalendarMonthConfig) {
    if (config.min && month.date.isBefore(config.min, 'month')) {
      return true;
    }

    return !!(config.max && month.date.isAfter(config.max, 'month'));
  }
}