import { Container, Grid, Paper } from '@material-ui/core';
import React from 'react';
import MatchInfo from '../components/match/MatchInfo';
import Messaging from '../components/match/Messaging';
import WhiskInfo from '../components/match/WhiskInfo';

export const Match = () => {
  return (
    <Container id='match-page'>
      <Grid container spacing={3} style={{ paddingBottom: '5%' }}>
        <Grid xs={12} sm={4} item>
          <div className='match'>
            <h2 className='heading'>Match Details</h2>
            <MatchInfo />
            <h2 className='heading'>Whisk Details</h2>
            <WhiskInfo />
          </div>
        </Grid>
        <Grid xs={12} sm={8} item>
          <Messaging />
        </Grid>
      </Grid>
    </Container>
  );
};
