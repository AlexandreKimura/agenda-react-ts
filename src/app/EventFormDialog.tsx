import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { TextField } from '@mui/material';

interface IEventFormDialog {
  open: boolean
  onClose: () => void
}

export function EventFormDialog(props: IEventFormDialog) {

  const { open, onClose } = props

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Criar evento
        </DialogTitle>
        <DialogContent>
          <TextField 
            type="date"
            margin='normal'
            label="Data"
            fullWidth
          />
          <TextField 
            autoFocus
            margin='normal'
            label="Descrição"
            fullWidth
          />
          <TextField 
            type="time"
            margin='normal'
            label="Hora"
            fullWidth
          />
          <FormControl  margin='normal' fullWidth>
            <InputLabel id='select-calendar'>Agenda</InputLabel>
            <Select
              labelId='select-calendar'
            >
              <MenuItem>Pessoal</MenuItem>
              <MenuItem>Trabalho</MenuItem>
            </Select>
          </FormControl>
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
