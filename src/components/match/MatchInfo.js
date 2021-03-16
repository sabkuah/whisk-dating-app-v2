import React from 'react';
import { Paper, Avatar, Grid } from '@material-ui/core';

const MatchInfo = ({ user }) => {
  return (
    <Paper className='match-info'>
      <Grid container spacing={2} style={{ width: '100%' }}>
        <Grid sm={12} md={6} className='img-grid-container' item>
          <Avatar variant='rounded' src={user?.ProfileImage} id='match-pic' />
        </Grid>
        <Grid sm={12} md={6} item>
          <div style={{ padding: '0 10px', width: '100%' }}>
            <h3>
              {user?.Fname} {user?.Lname} Marvis Ighedosa
            </h3>
            <hr />
            {user?.interests.join(', ')} Photography, Music, Dance
            <hr />
            <p>
              {user?.Bio}My top 3 guilty pleasures: reality TV dating shows,
              cheesy thrillers, my mom's chocolate chip cookies.
            </p>
          </div>
        </Grid>
      </Grid>

      <p className='blue-font' id='view-profile-button'>
        View Profile
      </p>
    </Paper>
  );
};

export default MatchInfo;
