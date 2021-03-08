import React, { useEffect, useState } from 'react';
import { AmplifyAuthenticator, AmplifySignIn } from "@aws-amplify/ui-react"
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Button } from '@material-ui/core';

const Welcome = () => {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData)
    });
  }, []);
  
  return (
    <div className='welcome-page'>
        {
          authState === AuthState.SignedIn && user ? 
          <div className='welcome-page'>
            <Button variant='contained' className='brand-button-lg'>
              Hello!
            </Button>
          </div>
         :
          <AmplifyAuthenticator>
            <AmplifySignIn
              headerText="Log In"
              slot="sign-in"
              usernameAlias="email"
              // hideSignUp="true"
              formFields={[
                {
                  type: "email",
                  label: "Email Address",
                  placeholder: "Enter your email address",
                  required: true,
                },
                {
                  type: "password",
                  label: "Password",
                  placeholder: "Enter your password",
                  required: true,
                },
              ]}
            />
          </AmplifyAuthenticator>
        }  
    </div>
  );
};

export default Welcome;
