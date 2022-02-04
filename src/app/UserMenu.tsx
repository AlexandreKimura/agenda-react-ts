import { IconButton, Avatar, Icon, Menu, MenuItem, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useContext, useState } from "react";
import { userContext } from "./authContext";
import { signOutEndpoint } from "./backend";

const useStyles = makeStyles({
  userDetails: {
    borderBottom: "1px solid rgb(224, 224, 224)",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      marginBottom: "8px"
    }
  }
})

interface IUserMenu {
  onSignOut: () => void
}

export function UserMenu(props: IUserMenu) {
  const user = useContext(userContext)

  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const { onSignOut } = props

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function signOut() {
    signOutEndpoint()
    onSignOut()
  }

  return (
    <div>
      <IconButton aria-controls="simple=menu" aria-haspopup="true" onClick={handleClick}>
        <Avatar>
          <Icon>person</Icon>
        </Avatar>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box className={classes.userDetails}>
          <Avatar>
            <Icon>person</Icon>
          </Avatar>
          <div>{user.name}</div>
          <small>{user.email}</small>
        </Box>
        <MenuItem onClick={signOut}>Sair</MenuItem>
      </Menu>
    </div>
  )
}