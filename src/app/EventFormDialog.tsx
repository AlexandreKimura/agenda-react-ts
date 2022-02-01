import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { TextField } from '@mui/material';
import { ICalendar } from './backend';
import { useEffect, useState } from 'react';

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

  const { calendars, onClose } = props

  const [event, setEvent] = useState<IEditingEvent | null>(props.event)

  useEffect(() => {
    setEvent(props.event)
  }, [props.event])

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
                onChange={(e) => setEvent({...event, date: e.target.value})}
              />
              <TextField 
                autoFocus
                margin='normal'
                label="Descrição"
                fullWidth
                value={event.desc}
                onChange={(e) => setEvent({...event, desc: e.target.value})}
              />
              <TextField 
                type="time"
                margin='normal'
                label="Hora"
                fullWidth
                value={event.time ?? ""}
                onChange={(e) => setEvent({...event, time: e.target.value})}
              />
              <FormControl  margin='normal' fullWidth>
                <InputLabel id='select-calendar'>Agenda</InputLabel>
                <Select
                  labelId='select-calendar'
                  value={event.calendarId}
                  onChange={(e) => setEvent({...event, calendarId: e.target.value as number})}
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
