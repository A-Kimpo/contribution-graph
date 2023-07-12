import React from 'react';
import './Month.css';

const Month = (props) => (
    <div className="months">
      {props.months
        .map((m, i) => (
          <React.Fragment key={i}>
            <p className="month">
              {m}
            </p>
          </React.Fragment>
        ))}
    </div>
  );

export default Month;
