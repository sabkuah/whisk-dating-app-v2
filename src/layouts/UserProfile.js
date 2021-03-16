import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Button, Typography, TextField } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import UserContext from '../context/user/userContext';
import { Link } from 'react-router-dom';
import UserModal from '../components/Modal';

const UserProfile = () => {
  const userContext = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const { user } = userContext;

  useEffect(() => {
    console.log('User state in Profile>>', user);
  }, []);

    const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const aboutMe = () => {
  //   return (
  //     <div>
  //     </div>
  //   )
  // }
  const aboutMe = (
    <form id="aboutMe-form">
      <Typography variant="h5">Complete My Profile</Typography>
      <TextField
        label='First Name'
        className='text-field'
      />
      <TextField
        label='Last Name'
        // onChange={(e) => setEmail(e.target.value)}
        className='text-field'
      />
      <TextField
        label='Phone'
        // onChange={(e) => setPW(e.target.value)}
        className='text-field'
      />
       <Button className='submit-btn' type='submit'>
        Sign Up
      </Button>
    </form>
  )

  return (
    <div className='profile-page'>
      <h1>My Profile</h1>
      <div className='card-title'>
        <span>Personal details</span>
        <a className='blue-font' onClick={handleOpen}>change</a>
      </div>
      <div className='about-card'>
        <div className='wrapper'>
          <Avatar variant='rounded' src={user?.ProfileImage} id='display-photo' />
          <div style={{ padding: '0 10px', width: '100%' }}>
            <h3>
              {user?.Fname} {user?.Lname}
            </h3>
            <hr />
            <p>{user?.Bio}</p>
          </div>
        </div>
      </div>
      <Button>
        <span>About You</span> <ChevronRightIcon />
      </Button>
      <Button>
        <span>Preferences</span>
        <ChevronRightIcon />
      </Button>
      <Link to='/user/whisks'>
        <Button>
          <span>Whisks</span>
          <ChevronRightIcon />
        </Button>
      </Link>
      <Button>
        <span>Help</span>
        <ChevronRightIcon />
      </Button>
      <Button id='action-btn'>Update</Button>
      <UserModal body={aboutMe} open={open} handleClose={handleClose}/>
    </div>
  );
};

export default UserProfile;
