import { Container, Grid, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import MatchInfo from '../components/match/MatchInfo';
import Messaging from '../components/match/Messaging';
import WhiskInfo from '../components/match/WhiskInfo';
import UserModal from '../components/Modal';
import confirmMatch from '../components/match/confirmMatch';

export const Match = () => {
  const [open, setOpen] = useState(true);

  //

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Container id='match-page'>
      <Grid container spacing={3} style={{ paddingBottom: '5%' }}>
        <Grid xs={12} sm={4} item>
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
