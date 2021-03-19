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
  const { user, cancelChooseWhisk, createMatch } = userContext;
  const {
    whisks,
    scanWhisks,
    setLoadingFalse,
    setLoadingTrue,
    loading,
  } = whiskContext;
  const [chosenWhisks, setChosenWhisks] = useState(null);

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
      await checkContextForWhisks();
      await getChosenWhiskDetails();
      //createMatch(user, '43190d21-9fb9-462d-97d1-79d73e15262e');
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
          {user && (
            <Grid item xs={12} sm={6} md={6}>
              <UserMatches whisks={user.matches} />
            </Grid>
          )}
        </Grid>
      </Container>
    );
};

export default UserWhisks;
