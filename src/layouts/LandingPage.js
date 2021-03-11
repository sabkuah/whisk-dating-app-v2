import { useContext } from 'react';
import { Button, Typography } from '@material-ui/core';


  const LandingPage = () => {

  return (
    <div className="hero-background">
      <div className="text-container">
        <Typography variant="h4">An "Experience First" approach <br/> to meeting new people.</Typography>
        <div>Install the app to your home screen</div>
        <Button>Login</Button>
        <Button id="register">Register</Button>
      </div>
    </div>
    
  );
};

export default LandingPage;