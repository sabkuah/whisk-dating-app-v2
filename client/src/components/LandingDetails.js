import { Typography } from '@material-ui/core';
import React from 'react';
import whisklogin from '../assets/whisklogin.png';
import whiskWhisks from '../assets/whiskWhisks.png';
import chat from '../assets/chat.png';

const landingDetails = () => {
  const twoClasses = 'reverse details';

  return (
    <div className='border'>
      <div className='details'>
        <img src={whisklogin} alt='whisklogin' />
        <div className='text'>
          <Typography variant='h3'>Create an account</Typography>
          <Typography variant='h2'>
            Create/login to an existing account to get started
          </Typography>
          <Typography variant='h4'>
            An account is created with your email and a password
          </Typography>
        </div>
      </div>
      <div className={twoClasses}>
        <div className='text'>
          <Typography variant='h3'>Explore Whisks</Typography>
          <Typography variant='h2'>
            Find experiences you're interested in
          </Typography>
          <Typography variant='h4'>
            Choose up to 5 experiences and we match you with someone who has
            chosen the same
          </Typography>
        </div>
        <img src={whiskWhisks} alt='listofWhisks' />
      </div>
      <div className='details'>
        <img src={chat} alt='mobileChat' />
        <div className='text'>
          <Typography variant='h3'>
            Meet your Whisk partner and explore
          </Typography>
          <Typography variant='h2'>
            When you're ready, go for your experience
          </Typography>
          <Typography variant='h4'>
            Set a time with your Whisk partner and enjoy the experience!
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default landingDetails;
