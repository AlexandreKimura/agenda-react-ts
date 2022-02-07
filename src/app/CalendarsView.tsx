import { Box, FormControlLabel, Checkbox } from "@mui/material";
import { memo } from "react";
import { ICalendar } from "./backend";

interface ICalendarsViewProps {
  calendars: ICalendar[],  
  toggleCalendar: (i: number) => void, 
  calendarsSelected: boolean[]
}

export const CalendarsView = memo(function (props: ICalendarsViewProps) {

  const { calendars, calendarsSelected, toggleCalendar } = props;

  return (
    <Box marginTop='64px'>
      <h3>Agenda React</h3>
      {calendars.map((calendar, i) => (
        <div key={calendar.id} >
          <FormControlLabel
            control={<Checkbox style={{ color: calendar.color }} checked={calendarsSelected[i]} onChange={() => toggleCalendar(i)}/>} 
            label={calendar.name}
          />
        </div>
      ))}
    </Box>
  )
})
