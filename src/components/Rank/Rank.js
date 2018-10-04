import React from 'react';
import './Rank.scss';

const rank = (props) => {
  let rankClasses = ['rank'];
  let rank = '';

  switch (Number.parseInt(props.rank)) {
    case 1: rank = 'A'; break;
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10: rank = props.rank; break;
    case 11: rank = 'J'; break;
    case 12: rank = 'Q'; break;
    case 13: rank = 'K'; break;
    default: throw new Error(`Rank of type ${props.rank} is not defined.`);
  }

  switch (props.size) {
    case 'sm': rankClasses.push('rank--small'); break;
    case 'md': rankClasses.push('rank--medium'); break;
    case 'lg': rankClasses.push('rank--large'); break;
    default: rankClasses.push('rank--medium');
  }

  return (
    <div className={rankClasses.join(' ')}>
      {rank}
    </div>
  );
};

export default rank;