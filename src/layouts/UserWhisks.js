import { Grid, Container } from '@material-ui/core';
import ChosenWhisks from '../components/userWhisks/ChosenWhisks';
import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import UserContext from '../context/user/userContext';
import UserMatches from '../components/userWhisks/UserMatches';
import WhiskContext from '../context/whisk/whiskContext';
import Spinner from '../components/Spinner';

const UserWhisks = () => {
  const userContext = useContext(UserContext);
  const whiskContext = useContext(WhiskContext);
  const {
    user,
    users,
    scanUsers,
    cancelChooseWhisk,
    saveMatchDataToContext,
    getAuthenticatedUser,
  } = userContext;
  const {
    whisks,
    scanWhisks,
    setLoadingFalse,
    setLoadingTrue,
    loading,
  } = whiskContext;
  const [chosenWhisks, setChosenWhisks] = useState(null);
  const [matchInfo, setMatchInfo] = useState([]);

  const handleCancelWhisk = async (whiskId) => {
    await cancelChooseWhisk(user, whiskId);
    getChosenWhiskDetails();
  };

  const getChosenWhiskDetails = () => {
    if (user.chosenWhisks?.length) {
      const items = user.chosenWhisks.map((id) => {
        return whisks.find((w) => w.ID === id);
      });
      setChosenWhisks(items);
    }
  };

  const checkContextForInfo = async () => {
    if (whisks.length === 0) {
      await scanWhisks();
    }
    if (users.length === 0) {
      await scanUsers();
    }
    if (!user) {
      await getAuthenticatedUser();
    }
  };

  const checkContextForWhisks = async () => {
    if (whisks.length === 0) {
      await scanWhisks();
    }
  };

  useEffect(() => {
    (async () => {
      setLoadingTrue();
      await checkContextForInfo();
      console.log('users', users);
      console.log('user', user);
      console.log('whisks', whisks);
      await getChosenWhiskDetails();
      const matches = await saveMatchDataToContext(users, user, whisks);
      setMatchInfo(matches);
      console.log('matchInfo', matchInfo);
      setLoadingFalse();
    })();
    //eslint-disable-next-line
  }, []);

  if (loading === true) return <Spinner />;
  else
    return (
      <Container className='user-whisks'>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <ChosenWhisks
              whisks={chosenWhisks}
              handleCancelWhisk={handleCancelWhisk}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <UserMatches matches={matchInfo} />
          </Grid>
        </Grid>
      </Container>
    );
};

export default UserWhisks;
