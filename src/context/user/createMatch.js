import { API } from 'aws-amplify';
import { v4 as uuid } from 'uuid';

const createMatch = async (users, user, whiskId) => {
  //group users by preference
  let femaleUsers = [];
  let maleUsers = [];
  console.log('users', users);
  users.filter((u) => {
    switch (u.gender) {
      case 'female':
        femaleUsers.push(u);
        break;
      case 'male':
        maleUsers.push(u);
        break;
      default:
        // other - gender
        break;
    }
  });

  //Assemble possible matches for current user
  let potentialMatches = [];
  switch (user.preference) {
    case 'females':
      potentialMatches = femaleUsers;
      break;
    case 'males':
      potentialMatches = maleUsers;
      break;
    case 'other':
      potentialMatches = users;
      break;
    default:
      potentialMatches = users;
      break;
  }

  let possibleMatches = potentialMatches.filter((m) => m.ID !== user.ID);

  //Pick a random person
  console.log('Your possible matches are: ', possibleMatches);
  const randomIndex = Math.floor(Math.random() * possibleMatches.length);
  const matchedUser = possibleMatches[randomIndex];
  possibleMatches = []; //reset

  console.log(
    `Congrats, your match is: ${matchedUser.fName} ${matchedUser.lName}`,
    matchedUser
  );

  //Create match object
  const newMatch = {
    ID: uuid(),
    isConfirmed: true,
    status: 'pending',
    Type: 'Match',
    userIds: [user.ID, matchedUser.ID],
    whiskId: whiskId,
  };

  console.log('A match made in heaven!!', newMatch);

  //Add match object to DB
  const postMatchToDB = async () => {
    const apiName = 'whiskamplify';
    const path = `/api`;
    const myInit = {
      body: newMatch,
    };
    await API.post(apiName, path, myInit);
  };
  await postMatchToDB();

  //Add matchID current user's matches array
  const postMatchToUser = async (user, matchId) => {
    const updatedMatches = [...user.matches, matchId];

    const apiName = 'whiskamplify';
    const path = `/api/Match`;
    const myInit = {
      body: {
        userId: user.ID,
        matches: updatedMatches,
      },
    };
    console.log('🌹 Posting Matches to DB', myInit);
    await API.put(apiName, path, myInit);
  };

  //Post update match arrays to both users
  await postMatchToUser(user, newMatch.ID);
  await postMatchToUser(matchedUser, newMatch.ID);

  return matchedUser.fName;
};

export default createMatch;
