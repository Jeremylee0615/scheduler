import React from "react";

import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const DayListItemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  })

  const formatSpots = function () {
    const spotsRemaining = props.spots
    if (spotsRemaining === 0)
      return "no spots remaining";
    else if (spotsRemaining === 1)
      return "1 spot remaining"
    else {
      return `${spotsRemaining} spots remaining`

    }
  }
  return (
    <li className={DayListItemClass} selected={props.selected} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}