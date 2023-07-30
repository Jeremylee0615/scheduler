import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(newMode, replace = false) {
    
    if(replace) {
      setHistory(history => history.slice(0, history.length -1));
      setHistory(history => [...history, newMode]);
   
    } else {
      setHistory(history => [...history, newMode]);
    }
    
    setMode(newMode);
  }
  
  function back() {
    // history array can not be 0. There has to be at least 1 or more history//
    if (history.length > 1) {
  
    // grab 2nd element ~ Last element in history array (new mode)// 
      setMode(history[history.length - 2]);
    // when new array is called exclude the last element
      setHistory(history.slice(0, history.length - 1));
    }
  }
  
  return { mode, transition, back };
};