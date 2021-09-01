import React from 'react';
import 'components/DayListItem.scss';
var classNames = require('classnames');

export default function DayListItem(props) {

  const {name, setDay} = props;
  const spots = formatSpots(props.spots)
  const dayClass = classNames('day-list__item', {'day-list__item--selected': props.selected, 'day-list__item--full': props.spots === 0})
  return (
    <li className={dayClass} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{spots}</h3>
    </li>
  );
}

const formatSpots = (spots) => {

  if (spots === 0) {
    return 'no spots remaining';
  }
  if (spots === 1) {
    return '1 spot remaining';
  }

  if (spots > 1) {
    return `${spots} spots remaining`;
  }

}