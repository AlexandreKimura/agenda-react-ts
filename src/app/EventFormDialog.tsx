import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { TextField } from '@mui/material';
import { createEventEndpoint, deleteEventEndpoint, ICalendar, IEditingEvent, updateEventEndpoint } from './backend';
import { FormEvent, useEffect, useRef, useState } from 'react';

interface IEventFormDialog {
  event: IEditingEvent | null
  calendars: ICalendar[]
  onSave: () => void
  onCancel: () => void
}

interface IValidationErrors {
  [field: string]: string
}

export function EventFormDialog(props: IEventFormDialog) {

  const { calendars, onSave, onCancel } = props

  const [event, setEvent] = useState<IEditingEvent | null>(props.event)
  const [errors, setErrors] = useState<IValidationErrors>({})

  const inputDate = useRef<HTMLInputElement | null>()
  const inputDesc = useRef<HTMLInputElement | null>()

  useEffect(() => {
    setEvent(props.event)
    setErrors({})
  }, [props.event])

  const isNew = !event?.id

  function validate(): boolean {
    if(event) {
      const currentErrors: IValidationErrors = {}
      if(!event.date) {
        currentErrors["date"] = "Data deve ser preenchida"
        inputDate.current?.focus()
      }
      if(!event.desc) {
        currentErrors["desc"] = "Descrição deve ser preenchida"
        inputDesc.current?.focus()
      }
      setErrors(currentErrors)
      return Object.keys(currentErrors).length === 0
    }

    return false
  }

  function save(e: FormEvent) {
    e.preventDefault()
    if(event) {
      if(validate()) {
        if(isNew) {
          createEventEndpoint(event).then(onSave)
        }else {
          updateEventEndpoint(event).then(onSave)
        }
      }
    }
  }

  function deleteEvent() {
    if(event) {
      deleteEventEndpoint(event.id!).then(onSave)
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
        <DialogTitle id="alert-dialog-title" >
          {isNew ? "Criar evento" : "Editar evento"}
        </DialogTitle>
        <DialogContent>
          {event && (
            <>
              <TextField 
                inputRef={inputDate}
                type="date"
                margin='normal'
                label="Data"
                fullWidth
                value={event.date}
                onChange={(e) => setEvent({...event, date: e.target.value})}
                error={!!errors.date}
                helperText={errors.date}
              />
              <TextField 
               inputRef={inputDesc}
                autoFocus
                margin='normal'
                label="Descrição"
                fullWidth
                value={event.desc}
                onChange={(e) => setEvent({...event, desc: e.target.value})}
                error={!!errors.desc}
                helperText={errors.desc}
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
          {!isNew && (
            <Button type='button' onClick={deleteEvent}>Excluir</Button>
          )}
          <Box flex="1"></Box>
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
