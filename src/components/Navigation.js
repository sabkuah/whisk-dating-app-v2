import React, { useEffect, useState } from 'react';
import {AppBar, Button, Toolbar, Typography} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { AmplifySignOut } from "@aws-amplify/ui-react"
import { AmplifyAuthenticator, AmplifySignIn } from "@aws-amplify/ui-react"
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

const Navigation = () => {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();
  const history = useHistory();

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData)
    });
  }, []);

  return (
    <AppBar position="static" className="nav-container">
      <Toolbar>
        <Typography variant="h3" id="title-logo" onClick={() => history.push("/")}>
          Whisk
        </Typography>
        {
          authState === AuthState.SignedIn && user ?
          <>
            <Button>
              Profile
            </Button>
            <AmplifySignOut />
          </>
          :
          <Button>About</Button>
          // <AmplifyAuthenticator>
          //   <AmplifySignIn
          //     headerText="Log In"
          //     slot="sign-in"
          //     usernameAlias="email"
          //     // hideSignUp="true"
          //     formFields={[
          //       {
          //         type: "email",
          //         label: "Email Address",
          //         placeholder: "Enter your email address",
          //         required: true,
          //       },
          //       {
          //         type: "password",
          //         label: "Password",
          //         placeholder: "Enter your password",
          //         required: true,
          //       },
          //     ]}
          //   />
          // </AmplifyAuthenticator>
        }
      </Toolbar>
    </AppBar>
  );
}

export default Navigation