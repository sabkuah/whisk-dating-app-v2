import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { AmplifySignOut } from "@aws-amplify/ui-react"

const Navigation = () => {
  const history = useHistory();

  return (
    <AppBar position="static" className="nav-container">
      <Toolbar>
        <Typography variant="h3" id="title-logo" onClick={() => history.push("/")}>
          Whisk
        </Typography>
        <AmplifySignOut />
      </Toolbar>
    </AppBar>
  );
}

export default Navigation