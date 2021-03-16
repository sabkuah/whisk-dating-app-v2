import React from 'react';
import { Paper, Avatar } from '@material-ui/core';

const MatchInfo = ({ user }) => {
  return (
    <Paper className='match-info'>
      <div className='wrapper'>
        <Avatar variant='rounded' src={user?.ProfileImage} id='match-pic' />
        <div style={{ padding: '0 10px', width: '100%' }}>
          <h3>
            {user?.Fname} {user?.Lname}
          </h3>
          <hr />
          {user?.interests.join(', ')}
          <hr />
          <p>{user?.Bio}</p>
        </div>
      </div>
      <p className='blue-font view-profile'>View Profile</p>
    </Paper>
  );
};

export default MatchInfo;
