import { Grid, Container } from '@material-ui/core';
import ChosenWhisks from '../components/userWhisks/ChosenWhisks';
import React, { useContext, useEffect } from 'react';
import CardHorizontal from '../components/CardHorizontal';
import UserContext from '../context/user/userContext';
import UserMatches from '../components/userWhisks/UserMatches';

const UserWhisks = () => {
  const userContext = useContext(UserContext);
  const { user } = userContext;

  useEffect(() => {
    console.log("user's matches>>", user.Matches);
    console.log("user's chosen whisks>>", user.ChosenWhisks);
  }, []);

  return (
    <Container className='user-whisks'>
      <Grid container spacing={3}>
        <Grid item xs>
          <ChosenWhisks whisks={user.ChosenWhisks} />
        </Grid>
        <Grid item xs>
          <UserMatches whisks={user.Matches} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserWhisks;
