import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Avatar,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const UserMatches = ({}) => {
  const classes = useStyles();
  const dummyData = {
    matches: [
      {
        ID: '2f2f3185-0e19-4b57-90fa-c0f2e73726e3',
        isConfirmed: true,
        status: 'pending',
        Type: 'Match',
        userIds: [
          '52bb9ed8-2297-4996-89db-01383c09e51f',
          '5dd02c42-3024-4c57-bf3a-e1cdd239502c',
        ],
        whiskId: '173105dc-f900-4790-9b76-21a902d44a23',
      },
    ],
  };

  return (
    <div className='user-matches'>
      <h1>Your Matches</h1>
      <div className='chosen-list-item'>
        <List>
          <ListItem alignItems='center'>
            <ListItemAvatar>
              <Avatar src='https://locallens.com/wp-content/uploads/2020/08/madrid-dating-profile-photoshoot-0001.jpg' />
            </ListItemAvatar>
            <ListItemText primary='Ice Fishing with a Local' />
            <ListItemText secondary='Fred McDonald' />
            <Button>
              <Link to=''>View Match</Link>
            </Button>
          </ListItem>
          <Divider variant='inset' component='li' />
        </List>
      </div>
      {/* {whisks?.length ? (
        <List className={classes.root}>
          {whisks.map((w) => {
            return (
              <div key={w.ID} className='chosen-list-item'>
                <ListItem alignItems='center'>
                  <ListItemAvatar>
                    <Avatar alt={w.title} src={w.images[0]} />
                  </ListItemAvatar>
                  <ListItemText primary={w.title} />
                  <Button>Accept Match</Button>
                  <Button>Decline Match</Button>
                </ListItem>
                <Divider variant='inset' component='li' />{' '}
              </div>
            );
          })}
        </List>
      ) : (
        <p>No matches yet, hang tight! </p>
      )} */}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default UserMatches;
