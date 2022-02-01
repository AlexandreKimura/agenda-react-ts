import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { TextField } from '@mui/material';
import { createEventEndpoint, ICalendar, IEditingEvent } from './backend';
import { FormEvent, useEffect, useState } from 'react';

interface IEventFormDialog {
  event: IEditingEvent | null
  calendars: ICalendar[]
  onSave: () => void
  onCancel: () => void
}

export function EventFormDialog(props: IEventFormDialog) {

  const { calendars, onSave, onCancel } = props

  const [event, setEvent] = useState<IEditingEvent | null>(props.event)

  useEffect(() => {
    setEvent(props.event)
  }, [props.event])

  function save(e: FormEvent) {
    e.preventDefault()
    if(event) {
      createEventEndpoint(event).then(onSave)
    }
  }

  return (
    <div>
      
      <Dialog
        open={!!event}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={save} >
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
          <Button type='button' onClick={onCancel}>Cancelar</Button>
          <Button type="submit" autoFocus>
            Salvar
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div> 
  )
}
