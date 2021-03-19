import React from 'react';
import { Paper, InputBase, IconButton, Avatar } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { ChatRoom } from '../chat/chat'
const Messaging = () => {
  return (
    <Paper className='messaging'>
      <ChatRoom />
    </Paper>
  );
};

export default Messaging;
