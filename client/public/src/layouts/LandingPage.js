import { Button, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import LandingDetails from '../components/LandingDetails';

const LandingPage = () => {
  const history = useHistory();
  return (
    <>
      <div className='hero-background'>
        <div className='text-container'>
          <Typography variant='h4'>
            An "Experience First" approach <br /> to meeting new people.
          </Typography>
          <div>Install the app to your home screen</div>
          <Button onClick={() => history.push('/login')}>Login</Button>
          {/* <Button id="register" onClick={() => history.push("/login")}>Register</Button> */}
          <Button
            id='register'
            onClick={() =>
              history.push({
                pathname: '/login',
                state: { tab: 1 },
              })
            }
          >
            Register
          </Button>
        </div>
      </div>
      <div className='main-container'>
        <Typography variant='h4'>How the app works</Typography>
        <hr />
      </div>
      <LandingDetails />
    </>
  );
};

export default LandingPage;
