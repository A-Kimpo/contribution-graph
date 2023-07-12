import './Tooltip.css';
import { format } from 'date-fns';


const Tooltip = (props) => {
  const { date, contributions } = props;
  const [year, month, day] = date.split('-');

  const formattedDate = format(new Date(year, month, day), 'EEEE, MMMM dd, yyyy');

  return (
    <div className="tooltip">
      <p className="tooltip__contributions">{contributions} contributions</p>
      <p className="tooltip__date">{formattedDate}</p>
    </div>
  );
};

export default Tooltip;
