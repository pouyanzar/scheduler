import React from 'react';
import 'components/DayListItem.scss';
var classNames = require('classnames');

export default function DayListItem(props) {

  const {name, spots, setDay} = props;
  const dayClass = classNames('day-list__item', {'day-list__item--selected': props.selected, 'day-list__item--full': props.spots === 0})
  return (
    <li className={dayClass} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{spots}</h3>
    </li>
  );
}