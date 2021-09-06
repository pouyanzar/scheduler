import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import "components/Appointment/styles.scss";
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {
  const {time, interview} = props;
  return (
    <>
    <Header time={time} />
    {props.interview ? <Show interviewer={interview.interviewer.name} student={interview.student} /> : <Empty />}
    <article className="appointment"></article>
    </>
  );
}