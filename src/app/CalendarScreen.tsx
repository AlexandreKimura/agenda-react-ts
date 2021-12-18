import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Avatar, Box, Button, Checkbox, FormControlLabel, Icon, IconButton } from '@mui/material';

const DAYS_OF_WEEK = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB']

const useStyles = makeStyles({
  table: {
    borderTop: '1px solid rgb(224, 224, 224)',
    minHeight: "100%",
    "& td ~ td, & th ~ th": {
      borderLeft: "1px solid rgb(224, 224, 224)"
    }
  }
})

export function CalendarScreen() {
  const classes = useStyles()
  const weeks = generateCalendar(getToday())

  return (
    <Box display='flex' height="100%" alignItems="stretch">
      <Box borderRight='1px solid rgb(224, 224, 224)' width="16em" padding="8px 16px">
        <h2>Agenda React</h2>
        <Button variant='contained' color='primary'>
          Novo evento
        </Button>

        <Box marginTop='64px'>
          <h3>Agenda React</h3>
          <FormControlLabel 
            control={<Checkbox />}
            label="Pessoal"
          />
          <FormControlLabel 
            control={<Checkbox />}
            label="Trabalho"
          />
        </Box>
      </Box>
      <TableContainer component={"div"}>
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
        <Table className={classes.table} sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {DAYS_OF_WEEK.map(day => <TableCell align='center' key={day}>{day}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {weeks.map((week, i) => (
              <TableRow>
                {week.map(cell => <TableCell align='center' key={cell.date}>{cell.date}</TableCell>)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

interface ICalendarCell {
  date: string
}

function generateCalendar(date: Date): ICalendarCell[][] {
  const weeks: ICalendarCell[][] = []
  const jsDate = new Date()
  const currentMonth = jsDate.getMonth()

  const currentDay = new Date(jsDate.valueOf())
  currentDay.setDate(1);

  const dayOfWeek = currentDay.getDay()

  currentDay.setDate(1 - dayOfWeek)

  do {
    const week:ICalendarCell[] = [];
    for(let i = 0; i < DAYS_OF_WEEK.length; i++) {
      const isoDate = `${currentDay.getFullYear()}-${(currentDay.getMonth() + 1).toString().padStart(2, "0")}-${(currentDay.getDate()).toString().padStart(2, "0")}`
      week.push({date: isoDate})
      currentDay.setDate(currentDay.getDate() + 1)
    }
    weeks.push(week)
  } while (currentDay.getMonth() === currentMonth)

  return weeks
}

function getToday() {
  return new Date()
}

