import React from 'react';
import './Month.css';

const Month = (props) => {
  return (
    <div className="month">{props.months.map((m, i) => <React.Fragment key={i}><p>{m}</p></React.Fragment>)}</div>
  );
};

export default Month;
