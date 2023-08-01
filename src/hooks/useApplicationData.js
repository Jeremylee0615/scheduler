import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => {
    setState({ ...state, day })
  };

  useEffect(() => {
    const dayURL = "/api/days";
    const appointmentURL="/api/appointments";
    const interviewersURL = "/api/interviewers";  
    
    Promise.all([
        axios.get(dayURL),
        axios.get(appointmentURL),
        axios.get(interviewersURL)
      ]).then((all) => {
        setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }));
      });
  }, []);
  

  function updateSpots (state, appointments) {
  ///loop thru arrays of selectedDay and find the specific day that the user is on//
    const dayOfWeek = state.days.find((selectedDay)=>{
      return selectedDay.name === state.day
    })
   // add 1 to the spot if there is no interview in the appointment//  
    let spots = 0
    dayOfWeek.appointments.forEach(appointment =>{
      if(!appointments[appointment].interview){
        spots ++
      }
    });
    // day that has been updated with new spots remaining//
    let newDay  = {
      ...dayOfWeek,
      spots
    } 
    // return the updated days//
    const updatedDays = state.days.map((dayObj)=>{
      return dayObj.name === state.day ? newDay : dayObj

    })
    return updatedDays
  }

  //Creating appointment//
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    const updated = updateSpots(state, appointments)
    const url = `/api/appointments/${id}`;

    return axios.put(url, appointment).then(() => {
      setState({...state, appointments, days: updated})
    })
  };

  //Deleting appointment//
  function cancelInterview(id){
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const updated = updateSpots(state, appointments)
    
    const url =`/api/appointments/${id}`;

    return axios.delete(url).then(() =>{
      setState({...state, appointments, days: updated });
    })
  };

  return { state, setDay, bookInterview, cancelInterview };

};
