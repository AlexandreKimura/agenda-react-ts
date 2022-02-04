import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Icon } from '@mui/material';
import { ICalendar, IEvent } from './backend';
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
    display: "inline-block",
    fontWeight: 500,
    width: "24px",
    lineHeight: "24px",
    marginBottom: "4px",
    borderRadius: "50%",
    "&.today": {
      backgroundColor: "#3f51b5",
      color: "white",
    }
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

interface ICalendarProps {
  weeks: ICalendarCell[][]
  onClickDay: (date: string) => void 
  onClickEvent: (event: IEvent) => void
}

export function Calendar(props: ICalendarProps) {

  const { weeks, onClickDay, onClickEvent } = props
  const classes = useStyles()

  function handleClick(e: React.MouseEvent, date: string) {
    if(e.target === e.currentTarget) {
      onClickDay(date)
    }
  }

  return (
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
                <TableCell align='center' key={cell.date} onClick={(me) => handleClick(me, cell.date)}>
                  <div className={classes.dayOfMonth + (cell.date === getToday() ? " today" : "")}>
                    {cell.dayOfMonth}
                  </div>

                  {cell.events.map(event => {
                    const color = event.calendar.color
                    return (
                      <button key={event.id} className={classes.event} onClick={() => onClickEvent(event)}>
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
  )
}

export type IEventWithCalendar = IEvent & { calendar: ICalendar }

export interface ICalendarCell {
  date: string
  dayOfMonth: number
  events:  IEventWithCalendar[]
}
