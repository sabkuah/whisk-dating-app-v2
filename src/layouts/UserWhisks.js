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
    if (user.chosenWhisks?.length) {
      const items = user.chosenWhisks.map((id) => {
        console.log('id>>', id);
        console.log('whisks2', whisks);
        return whisks.find((w) => w.ID === id);
      });
      setChosenWhisks(items);
    }
  };

  const checkContextForWhisks = async () => {
    if (!whisks.length) {
      await scanWhisks();
      return;
    }
  };

  // useEffect(() => {
  //   setLoadingTrue();
  //   (async () => {
  //     console.log('before>>', whisks);
  //     await checkContextForWhisks();
  //     console.log('whisks>>', whisks);
  //     await getChosenWhiskDetails();
  //     console.log('chosenwhisks>>', chosenWhisks);
  //     console.log('user', user);
  //     setLoadingFalse();
  //   })();
  //   //eslint-disable-next-line
  // }, []);

  useEffect(() => {
    (async () => {
      console.log('before>>', whisks);
      await checkContextForWhisks();
      console.log('whisks>>', whisks);
      await getChosenWhiskDetails();
      console.log('chosenwhisks>>', chosenWhisks);
      console.log('user', user);
      setLoadingFalse();
    })();
  }, []);

  console.log('chosenwhisks', chosenWhisks);

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
