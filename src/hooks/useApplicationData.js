import { useState, useEffect } from "react";
import axios from "axios";

//custom hook to provide data for the app which uses by Application component
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  //fetch data for rendering the Application component
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  //sends a PUT request to add an inteview into database and updates the state
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const day = state.days.filter((day) => state.day === day.name);

    return new Promise((resolve, reject) =>
      axios
        .put(`http://localhost:8001/api/appointments/${id}`, { interview })
        .then((result) => {
          resolve(result);
          setState((prev) => ({
            ...prev,
            appointments,
            ...prev.days[day[0].id - 1].spots--,
          }));
        })
        .catch((err) => reject(err))
    );
  }

  //sends a DELETE request to remove an inteview from database and updates the state
  function cancelInterview(id) {
    const day = state.days.filter((day) => state.day === day.name);
    return new Promise((resolve, reject) => {
      axios
        .delete(`http://localhost:8001/api/appointments/${id}`, { id })
        .then((result) => {
          resolve(result);
          setState((prev) => ({
            ...prev,
            ...(prev.appointments[id].interview = null),
            ...prev.days[day[0].id - 1].spots++,
          }));
        })
        .catch((err) => reject(err));
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
