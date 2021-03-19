import React, { useContext, useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { Avatar, Button } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import UserContext from '../context/user/userContext';
import { Link } from 'react-router-dom';
import UserModal from '../components/Modal';
import DP from '../components/modalBodyComponents/profileImage';
import AboutMe from '../components/modalBodyComponents/aboutMe';
import Questionnaire from '../components/modalBodyComponents/questionnaire';

const UserProfile = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [preferencesOpen, setPrefOpen] = useState(false);
  const [profileImg, setDPOpen] = useState(false);
  const [userInfo, setInfo] = useState({});
  const [questions, setQuestions] = useState([]);
  // const [userQs, setUserResponses] = useState(null);
  
  const userContext = useContext(UserContext);
  const { user, updateProfile } = userContext;

  useEffect(() => {
    (async () => {
      const response = await getData();
      console.log("grabbing questions", response)
      setQuestions(response)
    })();
    console.log("user from context", user)
    setInfo(user)
    // setUserResponses(user.profileQuestionnaire)
  }, [])


  const getData = () => {
    const apiName = 'WhiskPro';
    const path = '/api/Question';
    const myInit = { // OPTIONAL
      headers: {}, // OPTIONAL
    };

    // const response = await 
    return API.get(apiName, path, myInit)
    // setQuestion(response)
  }


  const handleOpen = (modal) => {
    switch (modal) {
      case 'profileOpen':
        setProfileOpen(true);
        break;
      case 'preferencesOpen':
        setPrefOpen(true);
        break;
      case 'profileImg':
        setDPOpen(true);
        break;
      default:
        console.log('modal does not exist');
        break;
    }
  };

  const handleClose = (modal) => {
    switch (modal) {
      case 'profileOpen':
        setProfileOpen(false);
        break;
      case 'preferencesOpen':
        setPrefOpen(false);
        break;
      case 'profileImg':
        setDPOpen(false);
        break;
      default:
        console.log('modal does not exist');
        break;
    }
  };

  const handleChange = (field, value) => {
    if (field === 'age') {
      userInfo[field] = +value
    } else {
      userInfo[field] = value
    }
    setInfo(userInfo);
  };

  const submitUserProfile = (e) => {
    e.preventDefault();
    var userObject = { ...user, ...userInfo }
    console.log('submitUserProfile', userObject)
    updateProfile(userObject)
    setProfileOpen(false)
    setDPOpen(false)
    setPrefOpen(false)
  };

  return (
    <div className='profile-page'>
      <h1>My Profile</h1>
      <div className='card-title'>
        <span>Personal details</span>
        <a className='blue-font' onClick={() => handleOpen('profileOpen')}>
          change
        </a>
      </div>
      <div className='about-card'>
        <div className='wrapper'>
          <Avatar
            variant='rounded'
            src={user?.profileImage}
            id='display-photo'
            onClick={() => handleOpen('profileImg')}
          />
          <div style={{ padding: '0 10px', width: '100%' }}>
            <h3>
              {user?.fName} {user?.lName}
            </h3>
            <hr />
            <p>{user?.bio}</p>
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
      <UserModal
        body={
          <DP
            submit={submitUserProfile}
            handleChange={handleChange}
            user={user}
          />
        }
        open={profileImg}
        handleClose={() => handleClose('profileImg')}
      />
      <UserModal
        body={
          <AboutMe
            submit={submitUserProfile}
            handleChange={handleChange}
            user={user}
          />
        }
        open={profileOpen}
        handleClose={() => handleClose('profileOpen')}
      />
      <UserModal
        body={
        <Questionnaire 
          submit={submitUserProfile}
          setInfo={setInfo}
          user={userInfo}
          questions={questions}
        />}
        open={preferencesOpen}
        handleClose={() => handleClose('preferencesOpen')}
      />
    </div>
  );
};

export default UserProfile;
