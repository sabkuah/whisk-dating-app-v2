import React, { useContext, useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import UserContext from '../context/user/userContext';
import UserProfile from '../layouts/UserProfile'

const UserProfileController = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [preferencesOpen, setPrefOpen] = useState(false);
  const [profileImg, setDPOpen] = useState(false);
  const [userInfo, setInfo] = useState({});
  const [questions, setQuestions] = useState([]);
  const [notify, setNotify] = useState(null)
  const userContext = useContext(UserContext);
  const { user, updateProfile } = userContext;
  
  useEffect(() => {
    (async () => {
      const response = await getData();
      setQuestions(response)
      setInfo(user)
      console.log("is there a user?", user)
      setNotify(user?.profileQuestionnaire.length < response.length)
    })();
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
    console.log("handleOpen", modal)
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
    !!notify &&
    <UserProfile 
      handleClose={handleClose} 
      handleOpen={handleOpen}
      handleChange={handleChange}
      profileOpen={profileOpen} 
      preferencesOpen={preferencesOpen}
      profileImg={profileImg}
      questions={questions}
      userInfo={userInfo}
      setInfo={setInfo}
      notify={notify}
      submit={submitUserProfile}
    />
  )
};

export default UserProfileController;
