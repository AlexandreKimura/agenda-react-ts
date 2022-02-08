import { Box, FormControlLabel, Checkbox } from "@mui/material";
import { Dispatch, memo } from "react";
import { ICalendar } from "./backend";
import { ICalendarScreenAction } from "./calendarScreenReducer";

interface ICalendarsViewProps {
  calendars: ICalendar[],  
  dispatch: Dispatch<ICalendarScreenAction>
  calendarsSelected: boolean[]
}

export const CalendarsView = memo(function (props: ICalendarsViewProps) {

  const { calendars, calendarsSelected, dispatch } = props;

  return (
    <Box marginTop='64px'>
      <h3>Agenda React</h3>
      {calendars.map((calendar, i) => (
        <div key={calendar.id} >
          <FormControlLabel
            control={
              <Checkbox
                style={{ color: calendar.color }}
                checked={calendarsSelected[i]}
                onChange={() => dispatch({ type: "toggleCalendar", payload: i})}
              />
            } 
            label={calendar.name}
          />
        </div>
      ))}
    </Box>
  )
})
