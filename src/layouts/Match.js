import { Container, Grid, Avatar, Button } from '@material-ui/core';
import React, { useState } from 'react';
import MatchInfo from '../components/match/MatchInfo';
import Messaging from '../components/match/Messaging';
import WhiskInfo from '../components/match/WhiskInfo';
import UserModal from '../components/Modal';

export const Match = () => {
  const [open, setOpen] = useState(true);
  const user = {}; //temp
  const handleOpen = () => {
    setOpen(true);
  };

  const confirmMatch = (
    <Grid container justify='center' spacing={1} style={{ width: '100%' }}>
      <Grid xs={12} md={6} item>
        <Avatar
          variant='rounded'
          src={user?.ProfileImage}
          id='full-profile-match-pic'
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <div style={{ padding: '0 10px', width: '100%' }}>
          <h3>
            {user?.Fname} {user?.Lname} Marvis Ighedosa
          </h3>
          <hr />
          {/* add user images here */}
          {user?.interests?.join(', ')} Photography, Music, Dance
          <hr />
          <p>
            {user?.Bio}My top 3 guilty pleasures: reality TV dating shows,
            cheesy thrillers, my mom's chocolate chip cookies.
          </p>
        </div>
        {/* if already accepted, do not render accept button*/}
        <form>
          <Button>Decline</Button>
          <Button>Accept</Button>
        </form>
      </Grid>
    </Grid>
  );

  return (
    <Container id='match-page'>
      <Grid container spacing={3} style={{ paddingBottom: '5%' }}>
        <Grid xs={12} item id='match-avatars'>
          <h2>Marvis Inghedosa</h2>
          <div className='center'>
            <Button onClick={handleOpen}>
              <Avatar alt='Match Details' />
            </Button>
            <Button>
              <Avatar alt='Whisk Details' />
            </Button>
          </div>
        </Grid>
        <Grid xs={12} sm={4} item id='match-cards'>
          <div className='match'>
            <h2 className='heading'>Match Details</h2>
            <MatchInfo open={handleOpen} />
            <h2 className='heading'>Whisk Details</h2>
            <WhiskInfo />
          </div>
        </Grid>
        <Grid xs={12} sm={8} item>
          <Messaging />
        </Grid>
      </Grid>
      <UserModal
        body={confirmMatch}
        open={open}
        handleClose={() => setOpen(false)}
      />
    </Container>
  );
};
