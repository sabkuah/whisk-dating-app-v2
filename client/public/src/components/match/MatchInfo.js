import React from 'react';
import { Paper, Avatar, Grid, Button } from '@material-ui/core';

const MatchInfo = ({ matchedUser, open }) => {
  return (
    <Paper className='match-info'>
      <Grid container justify='center' spacing={1} style={{ width: '100%' }}>
        <Grid sm={12} md={6} className='img-grid-container' item>
          <Avatar
            variant='rounded'
            src={matchedUser?.profileImage}
            id='match-pic'
          />
        </Grid>
        <Grid sm={12} md={6} item>
          <div style={{ padding: '0 10px', width: '100%' }}>
            <h3>
              {matchedUser?.fName} {matchedUser?.lName}
            </h3>
            <hr />
            {matchedUser?.interests}
            <hr />
            <p>{matchedUser?.bio}</p>
          </div>
        </Grid>
      </Grid>

      <Button className='blue-font' id='view-profile-button' onClick={open}>
        View Profile
      </Button>
    </Paper>
  );
};

export default MatchInfo;
