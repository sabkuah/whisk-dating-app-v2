import React from 'react';
import { Avatar, Button } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Link } from 'react-router-dom';
import UserModal from '../components/Modal';
import DP from '../components/modalBodyComponents/profileImage';
import AboutMe from '../components/modalBodyComponents/aboutMe';
import Questionnaire from '../components/modalBodyComponents/questionnaire';
import WhiskSnackbar from '../components/SnackBar';

const UserProfile = (props) => {
  const {
    handleOpen,
    handleClose,
    profileOpen,
    preferencesOpen,
    profileImg,
    questions,
    userInfo,
    handleChange,
    setInfo,
    notify,
    submit,
  } = props;

  return (
    <div className='profile-page'>
      <h1>My Profile</h1>
      <div className='card-title'>
        <span>Personal details</span>
        <p
          className='blue-font'
          onClick={() => handleOpen('profileOpen')}
          style={{ cursor: 'pointer' }}
        >
          change
        </p>
      </div>
      <div className='about-card'>
        <div className='wrapper'>
          <Avatar
            variant='rounded'
            src={userInfo?.profileImage}
            id='display-photo'
            onClick={() => handleOpen('profileImg')}
          />
          <div style={{ padding: '0 10px', width: '100%' }}>
            <h3>
              {userInfo?.fName} {userInfo?.lName}
            </h3>
            <hr />
            <p>{userInfo?.bio}</p>
          </div>
        </div>
      </div>
      <Button onClick={() => handleOpen('profileOpen')}>
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
      <Button id='action-btn'>Update</Button>
      <UserModal
        body={<DP submit={submit} handleChange={handleChange} />}
        open={profileImg}
        handleClose={() => handleClose('profileImg')}
      />
      <UserModal
        body={<AboutMe submit={submit} handleChange={handleChange} />}
        open={profileOpen}
        handleClose={() => handleClose('profileOpen')}
      />
      <UserModal
        body={
          <Questionnaire
            submit={submit}
            setInfo={setInfo}
            questions={questions}
          />
        }
        open={preferencesOpen}
        handleClose={() => handleClose('preferencesOpen')}
      />
      <WhiskSnackbar open={notify} message='COMPLETE YOUR PROFILE!' />
    </div>
  );
};

export default UserProfile;
