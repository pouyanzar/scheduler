import React from "react";
import DayListItem from "./DayListItem";

//implements the list of days on the sidebar
export default function DayList(props) {
  return props.days.map((day) => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      setDay={props.setDay}
      selected={day.name === props.day}
    />
  ));
}
