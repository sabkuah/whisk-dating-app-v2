import { Grid, Container } from '@material-ui/core';
import ChosenWhisks from '../components/userWhisks/ChosenWhisks';
import React, { useContext, useEffect, useState } from 'react';
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
  } = userContext;
  const {
    whisks,
    scanWhisks,
    setLoadingFalse,
    setLoadingTrue,
    loading,
  } = whiskContext;
  const [chosenWhisks, setChosenWhisks] = useState(null);
  const [matchInfo, setMatchInfo] = useState(null);

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

  const checkContextForWhisks = async () => {
    if (whisks.length === 0) {
      await scanWhisks();
    }
  };

  useEffect(() => {
    (async () => {
      setLoadingTrue();
      await scanUsers();
      const matches = await saveMatchDataToContext(users, user, whisks);
      setMatchInfo(matches);
      await checkContextForWhisks();
      await getChosenWhiskDetails();
      setLoadingFalse();
    })();
    //eslint-disable-next-line
  }, [whisks]);

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
