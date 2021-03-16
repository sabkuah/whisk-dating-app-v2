import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Button, Typography, TextField } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import UserContext from '../context/user/userContext';
import { Link } from 'react-router-dom';
import UserModal from '../components/Modal';

const UserProfile = () => {
  const userContext = useContext(UserContext);
  const [profileOpen, setProfileOpen] = useState(false);
  const [preferencesOpen, setPrefOpen] = useState(false);
  const [userInfo, setInfo] = useState({});
  const { user } = userContext;

  useEffect(() => {
    console.log('User state in Profile>>', user);

  }, []);

  const handleOpen = (modal) => {
    console.log("handle modal Open", modal)
    modal === "profileOpen" ? setProfileOpen(true) : setPrefOpen(true)
  };

  const handleClose = (modal) => {
    modal === "profileOpen" ? setProfileOpen(false) : setPrefOpen(false)
  };

  const handleChange = (field, value) => {
    switch (field) {
      case 'fName':
        console.log("Fname", value)
        userInfo[field] = value
        break;
      case 'lName':
        console.log("Lname", value)
        userInfo[field] = value
        break;
      case 'phone':
        console.log("Phone", value)
        userInfo[field] = value
        break;
      case 'bio':
        console.log("Bio", value)
        userInfo[field] = value
        break;
      case 'interests':
        console.log("Interests", value)
        userInfo[field] = value
        break;
      default:
        break;
    }
    console.log("setting userinfo", userInfo)
    setInfo(userInfo)  
  }

  const submitUserProfile = (e) => {
    e.preventDefault()
    console.log("submitUserProfile", userInfo)
  }

  const questionnaire = <div>questionnaire modal</div>

  const aboutMe = (
    <form id="aboutMe-form" onSubmit={submitUserProfile}>
      <Typography variant="h5" style={{paddingBottom: "1em"}}>Complete My Profile</Typography>
      <TextField
        label='First Name'
        onChange={(e) => handleChange('fName', e.target.value)}
        className='text-field'
      />
      <TextField
        label='Last Name'
        onChange={(e) => handleChange('lName', e.target.value)}
        className='text-field'
      />
      <TextField
        label='Age'
        onChange={(e) => handleChange('age', e.target.value)}
        className='text-field'
      />
      <TextField
        label='Phone'
        onChange={(e) => handleChange('phone', e.target.value)}
        className='text-field'
      />
      <TextField
          id="bio"
          label="Bio"
          multiline
          rows={4}
          className='text-field'
          placeholder="Tell us about yourself"
          onChange={(e) => handleChange('bio', e.target.value)}
        />
        <TextField
          id="interests"
          label="Interests"
          multiline
          rows={2}
          className='text-field'
          placeholder="What are your hobbies"
          onChange={(e) => handleChange('interests', e.target.value)}
        />
       <Button className='submit-btn' type='submit'>
        Save
      </Button>
    </form>
  )

  return (
    <div className='profile-page'>
      <h1>My Profile</h1>
      <div className='card-title'>
        <span>Personal details</span>
        <a className='blue-font' onClick={() => handleOpen('profileOpen')}>change</a>
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
      <Button onClick={() => handleOpen('preferencesOpen')}>
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
      <UserModal body={aboutMe} open={profileOpen} handleClose={() => handleClose('profileOpen')}/>
      <UserModal body={questionnaire} open={preferencesOpen} handleClose={() => handleClose('preferencesOpen')}/>
    </div>
  );
};

export default UserProfile;
