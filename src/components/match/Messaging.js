import React from 'react';
import { Paper, InputBase, IconButton, Avatar, Box } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const Messaging = () => {
  return (
    <Paper className='messaging'>
      <div className='messages'>
        <div className='msg-sent'>
          <div className='wrapper'>
            <Paper className='msg-text'>
              <Box m={2}>Wow I love cookies!</Box>
            </Paper>
            <Avatar />
          </div>
        </div>
        <div className='msg-received'>
          <div className='wrapper'>
            <Avatar />
            <Paper className='msg-text'>
              <Box m={2}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Ducimus culpa commodi sequi architecto. Architecto beatae, sequi
                fugit velit deserunt, sed atque laudantium distinctio impedit
                porro iure alias dicta, repellat rerum.
              </Box>
            </Paper>
          </div>
        </div>
      </div>
      <div className='message-input'>
        <hr />
        <div className='wrapper message-form'>
          <InputBase className='input' />
          <IconButton>
            <SendIcon style={{ color: '#00d1ff' }} />
          </IconButton>
        </div>
      </div>
    </Paper>
  );
};

export default Messaging;
