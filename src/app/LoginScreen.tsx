import { Box, Button, Container, TextField } from "@mui/material";
import { useEffect, useState, FormEvent } from "react";

export function LoginScreen() {

  const [email, setEmail] = useState("ale@email.com")
  const [password, setPassword] = useState("1234")

  function signIn(e: FormEvent) {
    e.preventDefault()
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
        <Box textAlign="right" marginTop="16px">
          <Button variant='contained' color='primary'>Entrar</Button>
        </Box>
      </form>
    </Container>  
  )
}