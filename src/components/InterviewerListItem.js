import React from 'react';
var classNames = require('classnames');

export default function InterviewerListItem(props) {

  const {name, avatar} = props;
  const interviewerClass = classNames("interviewers__item", {"interviewers__item--selected":props.selected});
  return (
    <li className={interviewerClass}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {name}
    </li>
  );
}