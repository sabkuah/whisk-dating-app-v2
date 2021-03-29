import React from 'react';
import { Paper, Avatar, Grid } from '@material-ui/core';

const WhiskInfo = ({ whisk }) => {
  return (
    <Paper className='whisk-info'>
      <Grid container justify='center' spacing={1} style={{ width: '100%' }}>
        <Grid sm={12} md={6} item className='img-grid-container'>
          <Avatar src={whisk?.images[0]} id='whisk-pic' />
        </Grid>
        <Grid sm={12} md={6} item>
          <div style={{ padding: '0 10px', width: '100%' }}>
            <h3>{whisk?.title}</h3>
            <hr />
            <p>
              {whisk?.neighborhood && whisk?.neighborhood + ', '}
              {whisk?.city}
            </p>
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
