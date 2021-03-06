import React from "react";
import "components/Appointment/styles.scss";

//displays error message in case of something goes wrong
export default function Error(props) {
  const { message, onClick } = props;
  return (
    <main className="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">{message}</h3>
      </section>
      <img
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
        onClick={onClick}
      />
    </main>
  );
}
