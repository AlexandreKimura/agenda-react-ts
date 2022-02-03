import { Box, Button, Container, TextField } from "@mui/material";
import { useState, FormEvent } from "react";
import { IUser, signInEndpoint } from "./backend";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  error: {
    backgroundColor: "rgb(253, 236, 234)",
    borderRadius: "4px",
    padding: "16px",
    margin: "16px 0"
  }
})

interface ILoginScreenProps {
  onSignIn: (user: IUser) => void
}

export function LoginScreen(props: ILoginScreenProps) {

  const classes = useStyles()
  const { onSignIn } = props

  const [email, setEmail] = useState("ale@email.com")
  const [password, setPassword] = useState("1234")
  const [error, setError] = useState("")

  function signIn(e: FormEvent) {
    e.preventDefault()
    signInEndpoint(email, password).then((user) => {
      onSignIn(user)
    }, (err) => {
      setError("E-mail e senha incorretas")
    })
  }

  return (
    <Container maxWidth="sm">
      <h1>Agenda React</h1>
      <p>Digite e-mail e senha para entrar no sistema</p>

      <form onSubmit={signIn}>
        <TextField 
          margin='normal'
          label="E-mail"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField 
          type="password"
          margin='normal'
          label="Senha"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className={classes.error}>{error}</div>}
        <Box textAlign="right" marginTop="16px">
          <Button type="submit" variant='contained' color='primary'>Entrar</Button>
        </Box>
      </form>
    </Container>  
  )
}