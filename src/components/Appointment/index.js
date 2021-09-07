import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import "components/Appointment/styles.scss";
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {
  const {time, interview, interviewers, bookInterview, id} = props;
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    bookInterview(id, interview)
    .then(res => {
      transition(SHOW);
    });
  }
  return (
    <>
    <Header time={time} />

    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SAVING && <Status message={SAVING} />}
    {mode === SHOW && (
      
      <Show 
        interviewer={interview.interviewer.name} 
        student={interview.student} 
      />
    )}
    {mode === CREATE && <Form interviewers={interviewers} onCancel={() => back()} onSave={save} />}
    <article className="appointment"></article>
    </>
  );
}