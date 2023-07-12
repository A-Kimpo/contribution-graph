import './Frame.css';
import Day from '../day/Day';
import React from 'react';
import { format, getTime, previousMonday, eachMonthOfInterval, hoursToMilliseconds, eachDayOfInterval } from 'date-fns';
import WeekDays from '../weekDays/WeekDays';
import Month from '../month/Month';

const Frame = (props) => {
  const { dates } = props;

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
  }

  const getPrevDays = () => {
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

  const formattedMonths = getPrevMonths().map((m) => format(m, 'MMM'));

  const firstMonth = formattedMonths.shift();
  formattedMonths.push(firstMonth);

  const formattedDays = getPrevDays().reduce((acc, k, i) => {
    const dateToString = format(k, 'yyyy-MM-dd');
    acc[dateToString] = 0;
    return acc;
  }, {});

  const getNumberDate = (date) => Number(date.replaceAll('-', ''));

  const slicedReceived = () => {
    const numberDateStartGrid = getNumberDate(getStartDayDate())

    const result = Object
      .entries(dates)
      .filter(([key,]) => getNumberDate(key) >= numberDateStartGrid)

    return Object.fromEntries(result);
  }

  const result = { ...formattedDays, ...slicedReceived(dates) }

  return (
    <div className="frame">
      <div className="frame__months"><Month months={formattedMonths} /></div>
      <div className="frame__calendar">
        <WeekDays />
        <div className="grid__container">
          {Object.entries(result).map(([date, contributions], i) => <React.Fragment key={i}><Day date={date} contributions={contributions} /></React.Fragment>)}
        </div>
      </div>
      <div className="frame__legend">
        <div>Меньше</div>
        {[0, 9, 19, 29, 30].map((k, i) => <React.Fragment key={i}><Day contributions={k} /></React.Fragment>)}
        <div>Больше</div>
      </div>
    </div>
  );
};

export default Frame;
