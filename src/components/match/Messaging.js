import React from 'react';
import { Paper } from '@material-ui/core';
import { ChatRoom } from '../chat/chat';
const Messaging = () => {
  return (
    <Paper className='messaging'>
      <ChatRoom />
    </Paper>
  );
};

export default Messaging;
