import React from "react";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const DELETE = "DELETE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";

  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE"; 
  

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING, true);
    props.bookInterview(props.id, interview)
    //axios to return promise, use .then() - callback//
    .then(()=>{
      transition(SHOW);
    })
    .catch(()=>{
      transition(ERROR_SAVE, true)
    })  
  };

  function remove(){
    
    transition(DELETE, true);
    props.cancelInterview(props.id)
    .then(()=> 
      transition(EMPTY)
    )
    .catch(()=>
      transition(ERROR_DELETE, true)
    )
  }; 

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          interview={props.interview} 
          onDelete={()=> transition(CONFIRM)}
          onEdit={()=> transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers = {props.interviewers} 
          onCancel = {() => back ()}
          onSave = { save } 
        />
      )}
      {mode === SAVING && (
        <Status
          message="SAVING"
        />
      )}
      {mode === DELETE && (
        <Status
          message="DELETING"
        />
      )}  
      {mode === CONFIRM && (
        <Confirm 
          onConfirm={ remove }
          onCancel={ back } 
          message="Are you sure you would like to delete?"
        />
      )}
      {mode === EDIT && (
        <Form 
          student={props.interview.student}
          interviewer={props.interviewer} 
          interviewers={props.interviewers}
          onSave={ save }
          onCancel={ back }
        />
      )}
      {mode === ERROR_SAVE && (
        <Error 
          message="Could not create appointment"
          onClose={ back } 
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
          message="Could not cancel appointment"
          onClose={ back } 
        />
      )}             
    </article>
  );
};