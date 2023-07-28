import React from "react";

import DayListItem from "./DayListItem";

export default function DayList(props) {
  const {days} = props;
  const DayListInfo = days.map(day =>{
    return <DayListItem 
      key={day.key} 
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.value} 
      setDay={props.onChange}
    />
  });
  
  return (
   <ul>
     {DayListInfo}
   </ul>
  );
}