import React from 'react';
import { Paper, Avatar, Grid } from '@material-ui/core';

const WhiskInfo = ({ whisk }) => {
  return (
    <Paper className='whisk-info'>
      <Grid container justify='center' spacing={2} style={{ width: '100%' }}>
        <Grid sm={12} md={6} item className='img-grid-container'>
          <Avatar src={whisk?.Images[0]} id='whisk-pic' />
        </Grid>
        <Grid sm={12} md={6} item>
          <div style={{ padding: '0 10px', width: '100%' }}>
            <h3>{whisk?.title}Coffee in Mt.Pleasant</h3>
            <hr />
            <p>Sophie’s Tavern</p>
            <p>Platform 7 Roasters</p>
            <p>+1 604 123 4567</p>
            <hr />
            <p>Date: March, 27, 2021</p>
            <p>Time: 12:00</p>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default WhiskInfo;
