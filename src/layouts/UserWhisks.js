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
    // console.log("user's matches>>", user.Matches);
    // console.log("user's chosen whisks>>", user.ChosenWhisks);
    // console.log('whisks>>', whisks);

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
  }, []);

  if (loading) return <Spinner />;
  else
    return (
      <Container className='user-whisks'>
        <Grid container spacing={3}>
          <Grid item xs>
            <ChosenWhisks whisks={chosenWhisks} />
          </Grid>
          <Grid item xs>
            <UserMatches whisks={user.Matches} />
          </Grid>
        </Grid>
      </Container>
    );
};

export default UserWhisks;
