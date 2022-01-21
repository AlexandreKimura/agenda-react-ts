import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Avatar, Box, Button, Checkbox, FormControlLabel, Icon, IconButton } from '@mui/material';
import { getCalendarsEndpoint, getEventsEndpoint, ICalendar, IEvent } from './backend';
import { useEffect, useState } from 'react';
import { getToday } from './dateFunctions';

const DAYS_OF_WEEK = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB']

const useStyles = makeStyles({
  table: {
    borderTop: '1px solid rgb(224, 224, 224)',
    minHeight: "100%",
    tableLayout: "fixed",
    "& td ~ td, & th ~ th": {
      borderLeft: "1px solid rgb(224, 224, 224)"
    },
    "& td": {
      verticalAlign: 'top',
      overflow: "hidden",
      padding: "8px 4px"
    }
  },
  dayOfMonth : {
    fontWeight: 500,
    marginBottom: "4px"
  },
  event: {
    display: "flex",
    alignItems: "center",
    background: "none",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    whiteSpace: "nowrap",
    marginBottom: "4px 0"
  },
  eventBackground: {
    display: "inline-block",
    color: "white",
    padding: "2px 4px",
    borderRadius: "4px"
  }
})

export function CalendarScreen() {
  const classes = useStyles()

  const [events, setEvents] = useState<IEvent[]>([])
  const [calendars, setCalendars] = useState<ICalendar[]>([])
  const [calendarsSelected, setCalendarsSelected] = useState<boolean[]>([])

  const weeks = generateCalendar(getToday(), events, calendars, calendarsSelected)

  const firstDate = weeks[0][0].date
  const lastDate = weeks[weeks.length - 1][6].date

  useEffect(() => {
    Promise.all([getCalendarsEndpoint(),
    getEventsEndpoint(firstDate, lastDate)]).then(([calendars, events]) => {
      setCalendarsSelected(calendars.map(() => true));
      setCalendars(calendars)
      setEvents(events)
    })
  }, [firstDate, lastDate])  
  
  function toggleCalendar(i: number) {
    const newValue = [...calendarsSelected]
    newValue[i] = !newValue[i]
    setCalendarsSelected(newValue)
  }

  return (
    <Box display='flex' height="100%" alignItems="stretch">
      <Box borderRight='1px solid rgb(224, 224, 224)' width="16em" padding="8px 16px">
        <h2>Agenda React</h2>
        <Button variant='contained' color='primary'>
          Novo evento
        </Button>

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
      </Box>

      <Box flex="1" display="flex" flexDirection="column">
        <Box display='flex' alignItems='center' padding='8px 16px'>
          <Box>
            <IconButton aria-label='Mês anterior'>
              <Icon>chevron_left</Icon>
            </IconButton>
            <IconButton aria-label='Próximo mês'>
              <Icon>chevron_right</Icon>
            </IconButton>
          </Box>
          <Box flex='1' marginLeft='16px' component='h3'>Junho de 2021</Box>
          <IconButton aria-label='Usuário'>
            <Avatar>
              <Icon>person</Icon>
            </Avatar>
          </IconButton>
        </Box>

        <TableContainer style={{ flex: '1' }} component={"div"}>
          <Table className={classes.table} sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {DAYS_OF_WEEK.map(day => <TableCell align='center' key={day}>{day}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {weeks.map((week, i) => (
                <TableRow key={i}>
                  {week.map(cell => (
                    <TableCell align='center' key={cell.date}>
                      <div className={classes.dayOfMonth}>
                        {cell.dayOfMonth}
                      </div>

                      {cell.events.map(event => {
                        const color = event.calendar.color
                        return (
                          <button key={event.id} className={classes.event}>
                            {event.time && (
                              <> 
                                <Icon style={{ color }} fontSize='inherit'>
                                  watch_later
                                </Icon>
                                <Box component="span" margin="0 4px">
                                  {event.time}
                                </Box>
                              </>
                            )}
                            {event.time ? <span>{event.desc}</span> : <span className={classes.eventBackground} style={{backgroundColor : color}}>{event.desc}</span>} 
                          </button>
                        )
                      })}
                    </TableCell>)
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

type IEventWithCalendar = IEvent & { calendar: ICalendar }

interface ICalendarCell {
  date: string
  dayOfMonth: number
  events:  IEventWithCalendar[]
}

function generateCalendar(
  date: Date, 
  allEvents: IEvent[], 
  calendars: ICalendar[],
  calendarsSelected: boolean[]
): ICalendarCell[][] {
  const weeks: ICalendarCell[][] = []
  const jsDate = new Date()
  const currentMonth = jsDate.getMonth()

  const currentDay = new Date(jsDate.valueOf())
  currentDay.setDate(1);

  const dayOfWeek = currentDay.getDay()

  currentDay.setDate(1 - dayOfWeek)

  do {
    const week: ICalendarCell[] = [];
    for(let i = 0; i < DAYS_OF_WEEK.length; i++) {
      const isoDate = `${currentDay.getFullYear()}-${(currentDay.getMonth() + 1).toString().padStart(2, "0")}-${(currentDay.getDate()).toString().padStart(2, "0")}`
      
      const events: IEventWithCalendar[] = []
      
      for(const event of allEvents) {
        if(event.date === isoDate) {
          const calIndex = calendars.findIndex(cal => cal.id === event.calendarId)
          if(calendarsSelected[calIndex]) {
            events.push({...event, calendar: calendars[calIndex]})
          }
        }
      }

      week.push({ 
        dayOfMonth: currentDay.getDate(), 
        date: isoDate, 
        events
      })
      currentDay.setDate(currentDay.getDate() + 1)
    }
    weeks.push(week)
  } while (currentDay.getMonth() === currentMonth)

  return weeks
}
