import React from 'react';
import { Paper, Avatar } from '@material-ui/core';

const MatchInfo = ({ user }) => {
  return (
    <Paper className='match-info'>
      <div className='wrapper'>
        <Avatar variant='rounded' src={user?.ProfileImage} id='match-pic' />
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
      </div>
      <p className='blue-font view-profile'>View Profile</p>
    </Paper>
  );
};

export default MatchInfo;
