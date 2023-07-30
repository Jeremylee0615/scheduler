import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    const dayURL = "http://localhost:8001/api/days";
    const appointmentURL="http://localhost:8001/api/appointments";
    const interviewersURL = "http://localhost:8001/api/interviewers";  
    
    Promise.all([
        axios.get(dayURL),
        axios.get(appointmentURL),
        axios.get(interviewersURL)
      ]).then((all) => {
        setState(prev => ({
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }));
      });
  }, []);
  
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
    const url = `http://localhost:8001/api/appointments/${id}`;
    
    let req={
      url,
      method: 'PUT',
      data: appointment
    }

    return axios(req).then(response => {
      setState({...state, appointments})
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
    const url =`http://localhost:8001/api/appointments/${id}`;

    let req={
      url,
      method: 'DELETE',
      //data: appointment
    }

    return axios(req).then(response =>{
      setState({...state, appointments});
    })
  };

  return { state, setDay, bookInterview, cancelInterview };

};
