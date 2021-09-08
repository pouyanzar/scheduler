import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const {
    time,
    interview,
    interviewers,
    bookInterview,
    appointmentId,
    cancelInterview,
  } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    bookInterview(appointmentId, interview).then((res) => transition(SHOW));
  }

  function confirmDelete() {
    transition(CONFIRM);
  }

  function destroy() {
    transition(DELETING);
    cancelInterview(appointmentId).then((res) => transition(EMPTY));
  }

  function editAppointment() {
    transition(EDIT);
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
          onDelete={confirmDelete}
          onEdit={editAppointment}
        />
      )}
      {mode === CONFIRM && <Confirm onCancel={() => back()} onConfirm={destroy} message="Are you sure to delete the appointment?" />}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        
        <Form 
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save} 
          name={interview.student} 
          interviewer={interview.interviewer.id} 
          />
      )}
      <article className="appointment"></article>
    </>
  );
}
