import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Avatar,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const UserMatches = ({ matches }) => {
  return (
    <div className='user-matches'>
      <h1>Your Matches</h1>
      <div className='chosen-list-item'>
        <List>
          {matches?.map((match) => (
            <ListItem alignItems='center' key={match.ID}>
              <ListItemAvatar>
                <Avatar
                  src={match.matchedUser[0]?.profileImage}
                  alt='https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png'
                />
              </ListItemAvatar>
              <ListItemText primary={match.whisk[0]?.title} />
              <br />
              <ListItemText
                secondary={`${match.matchedUser[0]?.fName} ${match.matchedUser[0]?.lName}`}
              />
              <Button>
                <Link to='/user/match/333'>View Match</Link>
              </Button>
              <hr />
            </ListItem>
          ))}
          {/* <Divider variant='inset' component='li' /> */}
        </List>
      </div>
    </div>
  );
};

export default UserMatches;
