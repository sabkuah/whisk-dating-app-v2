import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';

const UserMatches = ({ matches }) => {
  return (
    <div className='user-matches'>
      <h1>Your Matches</h1>
      <div className='chosen-list-item'>
        <List>
          {matches?.length ? (
            matches.map((match) => (
              <ListItem alignItems='center' key={match.ID}>
                <ListItemAvatar>
                  <Avatar src={match.matchedUser?.profileImage} />
                </ListItemAvatar>
                <ListItemText primary={match.whisk?.title} />
                <br />
                <ListItemText
                  secondary={`${match.matchedUser?.fName} ${match.matchedUser?.lName}`}
                />
                <Button>
                  <Link to={`/user/match/${match.ID}`}>View Match</Link>
                </Button>
                <hr />
              </ListItem>
            ))
          ) : (
            <p>error</p>
          )}
          {}
          {/* <Divider variant='inset' component='li' /> */}
        </List>
      </div>
    </div>
  );
};

export default UserMatches;
