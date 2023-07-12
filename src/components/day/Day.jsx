import './Day.css';
import Tooltip from '../tooltip/Tooltip';
import { useState } from 'react';

const Day = (props) => {
  const { date, contributions } = props;
  const [showTooltip, setShowTooltip] = useState(false);

  const s = (contributions) => {
    if (contributions === 0) {
      return 'empty'
    } else if (contributions <= 9) {
      return 's'
    } else if (contributions <= 19) {
      return 'm'
    } else if (contributions <= 29) {
      return 'l'
    } else if (contributions >= 30) {
      return 'xl'
    }
  };

  return (
    <div onClick={() => setShowTooltip(true)} className={`day ${s(contributions)}`}>
      {showTooltip ? <Tooltip date={date} contributions={contributions} /> : ''}
    </div>
  );
};

export default Day;
