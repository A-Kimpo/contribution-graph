import './Frame.css';
import Day from '../day/Day';
import React from 'react';
import {
  format,
  getTime,
  previousMonday,
  nextSunday,
  eachMonthOfInterval,
  hoursToMilliseconds,
  eachDayOfInterval,
} from 'date-fns';
import { ru } from 'date-fns/locale';

import WeekDays from '../weekDays/WeekDays';
import Month from '../month/Month';
import { Tooltip } from 'react-tooltip';

const getFirstWeekDay = () => {
  const currentDate = format(new Date(), 'yyyy-MM-dd');
  const previousMon = previousMonday(new Date(currentDate));
  const formatMonday = format(new Date(previousMon), 'yyyy-MM-dd');
  return formatMonday;
};

const getStartDayDate = () => {
  const formatMonday = getFirstWeekDay();
  const msMondayTime = getTime(new Date(formatMonday));
  const msBack = hoursToMilliseconds(350 * 24);
  const dateBack = msMondayTime - msBack;
  const dateStartGrid = format(dateBack, 'yyyy-MM-dd');
  return dateStartGrid;
};

const getPrevWeeksDays = () => {
  const dateStartGrid = getStartDayDate();
  const formatMonday = getFirstWeekDay();
  const result = eachDayOfInterval({
    start: new Date(dateStartGrid),
    end: new Date(formatMonday)
  });
  return result
    .slice(0, result.length - 1);
};

const getPrevMonths = () => {
  const dateStartGrid = getStartDayDate();
  const formatMonday = getFirstWeekDay();
  const result = eachMonthOfInterval({
    start: new Date(dateStartGrid),
    end: new Date(formatMonday)
  });
  return result
    .slice(0, result.length - 1);
};

const getCurrentWeekDays = () => {
  const firstDay = getFirstWeekDay();
  const [year, month, day] = firstDay.split('-');
  const lastDay = nextSunday(new Date(year, month - 1, day));
  const formatLastDay = format(new Date(lastDay), 'yyyy-MM-dd');

  const result = eachDayOfInterval({
    start: new Date(firstDay),
    end: new Date(formatLastDay)
  });
  return result;
};

const renderDays = (arrayDays) => Object
  .entries(arrayDays)
  .map(([date, contributions], i) => {
    const [year, month, day] = date.split('-');
    const formattedDate = !!date ? format(new Date(year, month - 1, day), 'EEEE, dd MMMM, yyyy', { locale: ru }) : '';
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
    )
  });

const Frame = (props) => {
  const { dates } = props;

  const formattedMonths = getPrevMonths().map((m) => format(m, 'MMM', { locale: ru }));

  const firstMonth = formattedMonths.shift();
  formattedMonths.push(firstMonth);

  const allDays = getPrevWeeksDays().concat(getCurrentWeekDays())

  const formattedDays = allDays.reduce((acc, key, i) => {
    const dateToString = format(key, 'yyyy-MM-dd');
    acc[dateToString] = 0;
    return acc;
  }, {});

  const getNumberDate = (dateString) => Number(dateString.replaceAll('-', ''));

  const slicedReceivedDates = () => {
    const numberDateStartGrid = getNumberDate(getStartDayDate());

    const result = Object
      .entries(dates)
      .filter(([key,]) => getNumberDate(key) >= numberDateStartGrid);

    return Object.fromEntries(result);
  };

  const recievedDays = slicedReceivedDates(dates)

  const resultDays = { ...formattedDays, ...recievedDays};

  return (
    <div className="frame">
      <div className="frame__months">
        <Month months={formattedMonths} />
      </div>
      <div className="frame__calendar">
        <WeekDays />
        <div className="grid__container">
          {renderDays(resultDays)}
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
