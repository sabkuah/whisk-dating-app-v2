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
  const { user, cancelChooseWhisk } = userContext;
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
    if (user.ChosenWhisks) {
      const items = user.ChosenWhisks.map((id) => {
        return whisks.find((w) => w.ID === id);
      });
      setChosenWhisks(items);
    }
  };

  const checkContextForWhisks = async () => {
    if (!whisks.length) {
      await scanWhisks();
    }
    return;
  };

  useEffect(() => {
    setLoadingTrue();
    checkContextForWhisks();
    getChosenWhiskDetails();
    setLoadingFalse();
  }, [loading]);

  //   useEffect(() => {
  //     getChosenWhiskDetails();
  //   }, [user]);

  if (loading) return <Spinner />;
  else
    return (
      <Container className='user-whisks'>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <ChosenWhisks
              whisks={chosenWhisks}
              handleCancelWhisk={handleCancelWhisk}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UserMatches whisks={user.Matches} />
          </Grid>
        </Grid>
      </Container>
    );
};

export default UserWhisks;
