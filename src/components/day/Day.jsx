import './Day.css';

const Day = (props) => {
  const { id, contributions } = props;

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
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a data-tooltip-id={id}>
    <div className={`day ${s(contributions)}`} />
    </a>
  );
};

export default Day;