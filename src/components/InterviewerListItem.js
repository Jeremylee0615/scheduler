import React from "react";

import "components/InterviewerListItem.scss";
import classNames from "classnames";


export default function InterviewerListItem(props) {
  
  const { name, avatar, selected, setInterviewer} = props;
  const interviewerItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected 
  });
  const interviewerImgClass = classNames("interviewers__item-image", {
    "interviewers__item--selected-image": selected   
  });
  
  return (
    <li className={interviewerItemClass} onClick={() => setInterviewer(name)}>
      <img
        className={interviewerImgClass}
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}