import { Grid, Container } from '@material-ui/core';
import ChosenWhisks from '../components/userWhisks/ChosenWhisks';
import React, { useContext, useEffect, useState } from 'react';
import CardHorizontal from '../components/CardHorizontal';
import UserContext from '../context/user/userContext';
import UserMatches from '../components/userWhisks/UserMatches';
import WhiskContext from '../context/whisk/whiskContext';
import Spinner from '../components/Spinner';

const UserWhisks = () => {
  const userContext = useContext(UserContext);
  const whiskContext = useContext(WhiskContext);
  const { user } = userContext;
  const {
    whisks,
    scanWhisks,
    setLoadingFalse,
    setLoadingTrue,
    loading,
  } = whiskContext;
  const [chosenWhisks, setChosenWhisks] = useState(null);

  useEffect(() => {
    setLoadingTrue();
    if (!whisks.length) {
      (async () => {
        await scanWhisks();
      })();
      return;
    }

    if (user.ChosenWhisks) {
      const items = user.ChosenWhisks.map((id) => {
        return whisks.find((w) => w.ID === id);
      });
      setChosenWhisks(items);
    }
    setLoadingFalse();
  }, [loading]);

  if (loading) return <Spinner />;
  else
    return (
      <Container className='user-whisks'>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <ChosenWhisks whisks={chosenWhisks} />
          </Grid>
          <Grid item xs={12} md={6}>
            <UserMatches whisks={user.Matches} />
          </Grid>
        </Grid>
      </Container>
    );
};

export default UserWhisks;
