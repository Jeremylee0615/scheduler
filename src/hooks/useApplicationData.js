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
  
  function findDay (day) {
    const dayOfWeek  = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4,
    }
    return dayOfWeek[day]
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

    //inital spots available for the selectedday//
    const dayOfWeek = findDay(state.day)
      let day  = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek]
      }
      //spots being updated by each time by - 1 when spot is taken after a new appointment is created
      if (!state.appointments[id].interview) {
        day = {
          ...state.days[dayOfWeek],
          spots: state.days[dayOfWeek].spots - 1
        }
      //no changes on spots remaining
      } else {
        day = {
          ...state.days[dayOfWeek],
          spots: state.days[dayOfWeek].spots 
        }
      }
    //update new spots reamining//
    let days  = state.days
    days[dayOfWeek] = day

    const url = `/api/appointments/${id}`;

    return axios.put(url, appointment).then(response => {
      setState({...state, appointments, days})
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
    //inital spots available for the selectedday//
    const dayOfWeek = findDay(state.day)
      //spots being updated by each time by + 1 when an existing appointment gets deleted on the selected day.
      const day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots + 1
      }
    //update new spots reamining//
    let days = state.days
    days[dayOfWeek] = day;
    
    const url =`/api/appointments/${id}`;

    let req={
      url,
      method: 'DELETE',
    }

    return axios(req).then(response =>{
      setState({...state, appointments});
    })
  };

  return { state, setDay, bookInterview, cancelInterview };

};
