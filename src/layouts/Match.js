import { Container, Grid, Avatar, Button } from '@material-ui/core';
import React, { useState, useContext, useEffect } from 'react';
import MatchInfo from '../components/match/MatchInfo';
import Messaging from '../components/match/Messaging';
import WhiskInfo from '../components/match/WhiskInfo';
import UserModal from '../components/Modal';
import UserContext from '../context/user/userContext';
import WhiskContext from '../context/whisk/whiskContext';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

export const Match = () => {
  const [open, setOpen] = useState(true);
  const [matchDoc, setMatchDoc] = useState({});
  const { id: matchId } = useParams();
  const userContext = useContext(UserContext);
  const whiskContext = useContext(WhiskContext);
  const {
    users,
    user,
    matches,
    scanUsers,
    getAuthenticatedUser,
    saveMatchDataToContext,
  } = userContext;
  const {
    whisks,
    scanWhisks,
    loading,
    setLoadingTrue,
    setLoadingFalse,
  } = whiskContext;

  const handleOpen = () => {
    setOpen(true);
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
    if (!matches || !matches.length) {
      await saveMatchDataToContext(users, user, whisks);
    }
  };

  useEffect(() => {
    (async () => {
      setLoadingTrue();
      checkContextForInfo();
      const foundMatch = matches?.find((m) => m.ID === matchId);
      console.log('matchdoc', foundMatch);
      setMatchDoc(foundMatch);
      setLoadingFalse();
    })();
    //eslint-disable-next-line
  }, []);

  const confirmMatch = (
    <Grid container justify='center' spacing={1} style={{ width: '100%' }}>
      <Grid xs={12} md={6} item>
        <Avatar
          variant='rounded'
          src={matchDoc?.matchedUser?.profileImage}
          id='full-profile-match-pic'
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <div style={{ padding: '0 10px', width: '100%' }}>
          <h3>
            {matchDoc?.matchedUser?.fName} {matchDoc?.matchedUser?.lName}
          </h3>
          <hr />
          {/* add user images here */}
          {matchDoc?.matchedUser?.interests}
          <hr />
          <p>{matchDoc?.matchedUser?.bio}</p>
        </div>
        {/* if already accepted, do not render accept button*/}
        <form>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Decline
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Accept
          </Button>
        </form>
      </Grid>
    </Grid>
  );

  if (loading === true) return <Spinner />;
  else
    return (
      <Container id='match-page'>
        <Grid container spacing={3} style={{ paddingBottom: '5%' }}>
          <Grid xs={12} item id='match-avatars'>
            <h2>
              {matchDoc?.matchedUser?.fName} {matchDoc?.matchedUser?.lName}
            </h2>
            <div className='center'>
              <Button onClick={handleOpen}>
                <Avatar
                  src={matchDoc?.matchedUser?.profileImage}
                  alt='Match Details'
                />
              </Button>
              <Button>
                <Avatar src={matchDoc?.whisk?.images[0]} alt='Whisk Details' />
              </Button>
            </div>
          </Grid>
          <Grid xs={12} sm={4} item id='match-cards'>
            <div className='match'>
              <h2 className='heading'>Match Details</h2>
              <MatchInfo
                open={handleOpen}
                matchedUser={matchDoc?.matchedUser}
              />
              <h2 className='heading'>Whisk Details</h2>
              <WhiskInfo whisk={matchDoc?.whisk} />
            </div>
          </Grid>
          <Grid xs={12} sm={8} item>
            <Messaging />
          </Grid>
        </Grid>
        <UserModal
          body={confirmMatch}
          open={open}
          handleClose={() => setOpen(false)}
        />
      </Container>
    );
};
