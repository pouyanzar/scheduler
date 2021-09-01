import React from 'react';
import "components/Appointment/styles.scss";

export default function Header() {
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">12pm</h4>
      <hr className="appointment__separator" />
    </header>
  )
}