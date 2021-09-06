export function getAppointmentsForDay(state, day) {
  if(state.days.length === 0) {
    return [];
  }
  const selectedDay = state.days.filter(d => d.name === day);
  if (selectedDay.length === 0) {
    return [];
  }
  const appointments = [];
  selectedDay[0].appointments.forEach(appointment => {
    appointments.push(state.appointments[appointment]);
  });
  
  return appointments;
}

export function getInterview(state, interview) {
 
  if(interview === null || state.interviewers === null) {
    return null;
  }
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };
}

export function getInterviewersForDay(state, day) {
  if(state.days.length === 0) {
    return [];
  }
  const selectedDay = state.days.filter(d => d.name === day);
  if (selectedDay.length === 0) {
    return [];
  }
  const interviewers = [];
  selectedDay[0].interviewers.forEach(interviewer => {
    interviewers.push(state.interviewers[interviewer]);
  });
  
  return interviewers;
}
