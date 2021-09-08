import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
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
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  let message = "";

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    bookInterview(appointmentId, interview)
      .then(() => transition(SHOW))
      .catch(() => {
        transition(ERROR_SAVE, true);
      });
  }

  function confirmDelete() {
    transition(CONFIRM);
  }

  function destroy() {
    transition(DELETING, true);
    cancelInterview(appointmentId)
      .then(() => transition(EMPTY))
      .catch(() => {
        transition(ERROR_DELETE, true);
      });
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
      {mode === CONFIRM && (
        <Confirm
          onCancel={() => back()}
          onConfirm={destroy}
          message="Are you sure to delete the appointment?"
        />
      )}
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
      {mode === ERROR_DELETE && (
        <Error 
          message="Cannot delete the appointment!" 
          onClick={() => back()}
        />
      )} 
      {mode === ERROR_SAVE && (
        <Error 
          message="Cannot save the appointment!" 
          onClick={() => back()}
          />
      )} 
      
      <article className="appointment"></article>
    </>
  );
}
