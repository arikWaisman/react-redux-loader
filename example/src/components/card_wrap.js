import React from 'react';

const CardWrap = props => {
  return (
    <div className="card">
      <div className="card-content">{props.children}</div>
    </div>
  );
};

export default CardWrap;
