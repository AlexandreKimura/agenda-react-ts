import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { TextField } from '@mui/material';
import { ICalendar } from './backend';

export interface IEditingEvent {
  id?: number
  date: string
  time?: string
  desc: string
  calendarId: number
}

interface IEventFormDialog {
  event: IEditingEvent | null
  calendars: ICalendar[]
  onClose: () => void
}

export function EventFormDialog(props: IEventFormDialog) {

  const { event, calendars, onClose } = props

  return (
    <div>
      <Dialog
        open={!!event}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Criar evento
        </DialogTitle>
        <DialogContent>
          {event && (
            <>
              <TextField 
                type="date"
                margin='normal'
                label="Data"
                fullWidth
                value={event.date}
              />
              <TextField 
                autoFocus
                margin='normal'
                label="Descrição"
                fullWidth
                value={event.desc}
              />
              <TextField 
                type="time"
                margin='normal'
                label="Hora"
                fullWidth
                value={event.time}
              />
              <FormControl  margin='normal' fullWidth>
                <InputLabel id='select-calendar'>Agenda</InputLabel>
                <Select
                  labelId='select-calendar'
                  value={event.calendarId}
                >
                  {calendars.map((calendar) => {
                    return <MenuItem key={calendar.id} value={calendar.id}>{calendar.name}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={onClose} autoFocus>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
