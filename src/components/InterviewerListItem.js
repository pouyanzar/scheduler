import React from 'react';
var classNames = require('classnames');

export default function InterviewerListItem(props) {

  const {name, avatar, selected} = props;
  const interviewerClass = classNames("interviewers__item", {"interviewers__item--selected":selected});
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