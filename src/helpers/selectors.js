/**
 * This function returns appointments within the selected day from Monday ~ Friday
 * @param {*} state 
 * @param {*} day 
 * @returns 
 */

function getAppointmentsForDay(state, day) {

  let results = [];

  //search through the state.days array and find the name that matches the selectedDay.
  const filteredDays = state.days.filter(selectedDay => selectedDay.name === day);
  //if there is no appointment on the filtered day, return empty array (results)
  if (!filteredDays[0]) {
    return results;
  }
  // search through the array of appointment and find the matching id in state.appointments then return the value// 
  for (let appointmentArr of filteredDays[0].appointments) {
    results.push(state.appointments[appointmentArr]);
  }

  return results;
}
/**
 * This function returns the data of selected interview
 * @param {*} state 
 * @param {*} interview 
 * @returns 
 */
function getInterview(state, interview) {

  if (!interview) {
    return null;
  }

  const interviewrInfo = state.interviewers[interview.interviewer]

  return {
    student: interview.student,
    interviewer: interviewrInfo
  }
};
/**
 * This function returns interviewers that are available for the selected days from Monday ~ Friday
 * @param {*} state 
 * @param {*} day 
 * @returns 
 */
function getInterviewersForDay(state, day) {

  let results = [];

  const filteredDays = state.days.filter(selectedDay =>
    selectedDay.name === day);

  if (!filteredDays[0]) {

    return results;
  }

  for (const interviewersArr of filteredDays[0].interviewers) {
    results.push(state.interviewers[interviewersArr]);

  }
  return results;

};


export { getAppointmentsForDay, getInterview, getInterviewersForDay };