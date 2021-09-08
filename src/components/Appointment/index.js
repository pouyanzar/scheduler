import React, {useState} from "react";
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
    id,
    cancelInterview,
  } = props;
  console.log(props)
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

  const [error, setError] = useState("");

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch((err) => {
        transition(ERROR_SAVE, true);
        setError("Cannot save the appointment!")
      });
  }

  function confirmDelete() {
    transition(CONFIRM);
  }

  function destroy() {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((err) => {
        transition(ERROR_DELETE, true);
        setError("Cannot delete the appointment!")
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
          message={error} 
          onClick={() => back()}
        />
      )} 
      {mode === ERROR_SAVE && (
        <Error 
          message={error} 
          onClick={() => back()}
          />
      )} 
      
      <article className="appointment"></article>
    </>
  );
}
