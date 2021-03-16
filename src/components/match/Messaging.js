import React from 'react';
import { Paper, InputBase, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const Messaging = () => {
  return (
    <Paper className='messaging'>
      <div className='messages'></div>
      <div className='message-input'>
        <hr />
        <div className='wrapper message-form'>
          <InputBase className='input' />
          <IconButton>
            <SendIcon />
          </IconButton>
        </div>
      </div>
    </Paper>
  );
};

export default Messaging;
