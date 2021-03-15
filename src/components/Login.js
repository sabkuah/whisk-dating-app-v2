import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardContent, Tab, TextField, Typography } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import WhiskTabs from './WhiskTabs';
import { Auth } from 'aws-amplify';
import { isMobile } from 'react-device-detect';
import UserContext from '../context/user/userContext';

const Login = () => {
  const location = useLocation();

  const [tab, setTab] = useState(location.state ? location.state.tab : 0);
  const [username, setUsername] = useState('');
  const [password, setPW] = useState('');
  const [confirm, setConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const userContext = useContext(UserContext);
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setTab(newValue);
    setErrorMsg("");
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (tab === 1) {
      // ------ REGISTER ------
      try {
        const user = await Auth.signUp({
          username: email,
          password,
          attributes: {
            email,
          },
        });
        console.log('registered user', user);
        setErrorMsg('');
        userContext.loginUser({
          email: email,
          username: user.user.username,
          sub: user.userSub,
        });
        var newUser = {
          Bio: '',
          ChosenWhisks: [],
          DateJoined: new Date().toISOString(),
          Fname: '',
          Lname: '',
          ID: user.userSub,
          Type: 'User',
          Images: [],
          Interests: [],
          Matches: [],
          Phone: '',
          Preference: [],
          ProfileImage: '',
          ProfileQuestionnaire: [],
        };
        console.log('new user obj', newUser);
        userContext.postUser(newUser);
        history.push('/user');
      } catch (err) {
        console.log(err);
        setErrorMsg(err.message);
      }
    } else {
      // ------ LOGIN ------
      try {
        const user = await Auth.signIn({
          username: email,
          password,
          attributes: {
            email,
          },
        });
        console.log('user', user.attributes);
        userContext.loginUser(user.attributes);
        setErrorMsg('');
        history.push('/');
      } catch (err) {
        console.log(err);
        setErrorMsg(err.message);
      }
    }
  };

  const handleLogin = (e) => {
    setPW(e);
    if (!!errorMsg) {
      setErrorMsg('');
    }
  };
  return (
    <Card id='card-root' elevation={0}>
      <CardContent style={{ maxWidth: '400px' }}>
        {isMobile && (
          <Typography
            variant='h3'
            id='title-logo'
            style={{
              display: 'block',
              textAlign: 'center',
              marginBottom: '1em',
            }}
          >
            Whisk
          </Typography>
        )}
        <form onSubmit={submitForm}>
          <WhiskTabs
            value={tab}
            onChange={handleChange}
            aria-label='login tabs'
            variant='fullWidth'
          >
            <Tab label='Login' style={{ fontWeight: 'bold' }} />
            <Tab label='Sign Up' style={{ fontWeight: 'bold' }} />
          </WhiskTabs>
          {/* ---------- LOGIN ---------- */}
          <TabPanel value={tab} index={0}>
            <TextField
              label='Email'
              onChange={(e) => setEmail(e.target.value)}
              className='text-field'
            />
            <TextField
              error={!!errorMsg ? true : false}
              type='password'
              id='login-helper-text'
              label='Password'
              helperText={!!errorMsg ? errorMsg : ''}
              className='text-field'
              onChange={(e) => handleLogin(e.target.value)}
            />

            <Button className='submit-btn' type='submit'>
              Login
            </Button>
          </TabPanel>
          {/* ---------- REGISTER ---------- */}
          <TabPanel value={tab} index={1}>
            <TextField
              label='Username'
              onChange={(e) => setUsername(e.target.value)}
              className='text-field'
            />
            <TextField
              label='Email'
              onChange={(e) => setEmail(e.target.value)}
              className='text-field'
            />
            <TextField
              label='Password'
              type='password'
              onChange={(e) => setPW(e.target.value)}
              className='text-field'
            />
            <TextField
              error={
                (!!confirm && password !== confirm) || !!errorMsg ? true : false
              }
              type='password'
              id='register-helper-text'
              label='Confirm Password'
              helperText={
                !!confirm && password !== confirm
                  ? 'Passwords must match'
                  : !!errorMsg
                  ? errorMsg
                  : ''
              }
              className='text-field'
              onChange={(e) => setConfirm(e.target.value)}
            />
            <Button className='submit-btn' type='submit'>
              Sign Up
            </Button>
          </TabPanel>
        </form>
      </CardContent>
    </Card>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default Login;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div style={{ paddingTop: '1em' }}>{children}</div>}
    </div>
  );
}
