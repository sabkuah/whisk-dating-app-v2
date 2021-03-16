import { Container, Grid, Paper } from '@material-ui/core';
import React from 'react';

export const Match = () => {
  return (
    <Container id='match-page'>
      <Grid container spacing={3}>
        <Grid xs={12} sm={4} item>
          <div className='match'>
            <Paper className='match-info'>Match Info</Paper>
            <Paper className='whisk-info'>Whisk Info</Paper>
          </div>
        </Grid>
        <Grid xs={12} sm={8} item>
          DM
        </Grid>
      </Grid>
    </Container>
  );
};
