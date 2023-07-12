import './Month.css';

const Month = (props) => {
  return (
    <div className="month">{props.months.map((m) => <p>{m}</p>)}</div>
  );
};

export default Month;
