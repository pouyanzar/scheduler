import {useState, useEffect} from 'react';
import axios from 'axios';

export default function useApplicationData() {
   const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  
  const setDay = (day) => setState({ ...state, day });
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
  
    function bookInterview(id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview },
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };
  
      return new Promise((resolve, reject) =>
        axios
          .put(`http://localhost:8001/api/appointments/${id}`, { interview })
          .then((result) => {
            resolve(result);
            setState((prev) => ({
              ...prev,
              appointments,
            }));
          })
          .catch((err) => reject(err))
      );
    }
  
    function cancelInterview(id) {
      
      return new Promise((resolve, reject) => {
        axios.delete(`http://localhost:8001/api/appointments/${id}`, {id})
        .then((result) => {
          resolve(result);
          setState((prev) => ({
            ...prev,
            ...prev.appointments[id].interview = null
          }));
        })
        .catch(err => reject(err))
      });
    }

    return {state, setDay, bookInterview, cancelInterview};
}
