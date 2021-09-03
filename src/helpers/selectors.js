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