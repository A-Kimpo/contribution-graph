import './Frame.css';
import React from 'react';
import { Tooltip } from 'react-tooltip';
import {
  format,
  getTime,
  previousMonday,
  previousSunday,
  nextSunday,
  eachMonthOfInterval,
  hoursToMilliseconds,
  eachDayOfInterval,
} from 'date-fns';
import { ru } from 'date-fns/locale';

import WeekDays from '../weekDays/WeekDays';
import Month from '../month/Month';
import Day from '../day/Day';

const getCurrentDate = () => format(new Date(), 'yyyy-MM-dd');

const getCurrentWeek = () => {
  const currentDate = getCurrentDate();
  const [year, month, day] = currentDate.split('-');

  const firstDay = previousMonday(new Date(year, month - 1, day));
  const lastDay = nextSunday(new Date(year, month - 1, day));

  const result = eachDayOfInterval({
    start: new Date(firstDay),
    end: new Date(lastDay)
  });
  return result;
};

const getFirstGridDate = () => {
  const currentDate = getCurrentDate();
  const [year, month, day] = currentDate.split('-');
  const lastDay = previousSunday(new Date(year, month - 1, day));

  const msLastSunday = getTime(new Date(lastDay));
  const msTimeBack = hoursToMilliseconds(349 * 24);
  const msFirstGridDate = msLastSunday - msTimeBack;

  const firstGridDate = format(msFirstGridDate, 'yyyy-MM-dd');

  return firstGridDate;
};

const getPrevWeeks = () => {
  const currentDate = getCurrentDate();
  const [year, month, day] = currentDate.split('-');

  const firstDay = getFirstGridDate();
  const lastDay = previousSunday(new Date(year, month - 1, day));

  const result = eachDayOfInterval({
    start: new Date(firstDay),
    end: new Date(lastDay)
  });

  return result;
};

const getPrevMonths = () => {
  const currentDate = getCurrentDate();
  const [year, month, day] = currentDate.split('-');

  const result = eachMonthOfInterval({
    start: new Date(year - 1, month, day),
    end: new Date(year, month - 1, day)
  });

  return result;
};

const getNumberType = (dateString) => Number(dateString.replaceAll('-', ''));

const slicedReceivedDates = (dates) => {
  const numberFirstGridDate = getNumberType(getFirstGridDate());

  const result = Object
    .entries(dates)
    .filter(([key,]) => getNumberType(key) >= numberFirstGridDate);

  return Object.fromEntries(result);
};

const renderDays = (arrayDays) => Object
  .entries(arrayDays)
  .map(([date, contributions], i) => {
    const [year, month, day] = date.split('-');

    const formattedDate = !!date
      ? format(new Date(year, month - 1, day), 'EEEE, dd MMMM, yyyy', { locale: ru })
      : '';

    return (
      <React.Fragment key={i}>
        <Tooltip
          id={i}
          className='tooltip_inner'
          style={{ zIndex: 2 }}
          openOnClick={['click']}
        >
          <p className="tooltip__contributions">{contributions} contributions</p>
          <p className="tooltip__date">{formattedDate}</p>
        </Tooltip>
        <Day id={i} contributions={contributions} />
      </React.Fragment>
    );
  });

const Frame = ({ dates }) => {
  const formattedMonths = getPrevMonths()
    .map((m) => format(m, 'MMM', { locale: ru }));

  const allGridDays = getPrevWeeks().concat(getCurrentWeek());

  const formattedDays = allGridDays
    .reduce((acc, key, i) => {
      const dateToString = format(key, 'yyyy-MM-dd');
      acc[dateToString] = 0;

      return acc;
    }, {});

  const recievedDays = slicedReceivedDates(dates);

  const unionDays = { ...formattedDays, ...recievedDays };

  return (
    <div className="frame">
      <div className="frame__months">
        <Month months={formattedMonths} />
      </div>
      <div className="frame__calendar">
        <WeekDays />
        <div className="grid__container">
          {renderDays(unionDays)}
        </div>
      </div>
      <div className="frame__legend">
        <div>Меньше</div>
        {[0, 9, 19, 29, 30]
          .map((k, i) => (
            <React.Fragment key={i}>
              <Day contributions={k} />
            </React.Fragment>
          ))}
        <div>Больше</div>
      </div>
    </div>
  );
};

export default Frame;
