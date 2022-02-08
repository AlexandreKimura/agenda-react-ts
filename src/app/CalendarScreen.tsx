import { Box, Button } from '@mui/material';
import { getCalendarsEndpoint, getEventsEndpoint, ICalendar, IEvent } from './backend';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { getToday } from './dateFunctions';
import { useParams } from 'react-router-dom';
import { CalendarsView } from './CalendarsView';
import { CalendarHeader } from './CalendarHeader';
import { Calendar, ICalendarCell, IEventWithCalendar } from './Calendar';
import { EventFormDialog } from './EventFormDialog'
import { reducer } from './calendarScreenReducer'

export function CalendarScreen() {

  let { month } = useParams<{ month: string }>()

  const [state, dispatch] = useReducer(reducer, {
    calendars: [],
    calendarsSelected: [],
    events: [],
    editingEvent: null
  })

  if(!month) {
    month = getToday()
  }

  const { events, calendars, calendarsSelected, editingEvent } = state

  const weeks = useMemo(() => {
    return generateCalendar(month + "-01", events, calendars, calendarsSelected)
  }, [month, events, calendars, calendarsSelected])

  const firstDate = weeks[0][0].date
  const lastDate = weeks[weeks.length - 1][6].date

  useEffect(() => {
    Promise.all([getCalendarsEndpoint(),
    getEventsEndpoint(firstDate, lastDate)]).then(([calendars, events]) => {
      dispatch({type: "load", payload: { events, calendars }})
    })
  }, [firstDate, lastDate])  

  function refreshEvent() {
    getEventsEndpoint(firstDate, lastDate).then(() => {
      dispatch({type: "load", payload: { events }})
    })
  }

  const closeDialog =   useCallback(() => {
    dispatch({type: "closeDialog"})
  }, [])

  return (
    <Box display='flex' height="100%" alignItems="stretch">
      <Box borderRight='1px solid rgb(224, 224, 224)' width="16em" padding="8px 16px">
        <h2>Agenda React</h2>
        <Button variant='contained' color='primary' onClick={() => dispatch({type: "new", payload: getToday()})}>
          Novo evento
        </Button>

        <CalendarsView calendars={calendars} dispatch={dispatch} calendarsSelected={calendarsSelected}/>
      </Box>

      <Box flex="1" display="flex" flexDirection="column">
        <CalendarHeader month={month}/>
        <Calendar weeks={weeks} dispatch={dispatch}/>
        <EventFormDialog 
          event={editingEvent} 
          onCancel={closeDialog}
          //onCancel={() => setEditingEvent(null)} 
          onSave={() => {
            closeDialog()
            //setEditingEvent(null); 
            refreshEvent()
          }}
          calendars={calendars}
        />
      </Box>
    </Box>
  )
}

function generateCalendar(
  date: string, 
  allEvents: IEvent[], 
  calendars: ICalendar[],
  calendarsSelected: boolean[]
): ICalendarCell[][] {
  console.log('Teste')
  const weeks: ICalendarCell[][] = []
  const jsDate = new Date(date + "T12:00:00")
  const currentMonth = jsDate.getMonth()

  const currentDay = new Date(jsDate.valueOf())
  currentDay.setDate(1);

  const dayOfWeek = currentDay.getDay()

  currentDay.setDate(1 - dayOfWeek)

  do {
    const week: ICalendarCell[] = [];
    for(let i = 0; i < 7; i++) {
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

