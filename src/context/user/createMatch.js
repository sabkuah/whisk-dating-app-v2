import { API } from 'aws-amplify';
import { v4 as uuid } from 'uuid';

const FemaleUsers = [
  '52bb9ed8-2297-4996-89db-01383c09e51f',
  '59490f6f-5eba-405a-a4e1-770efb15794a',
];

const MaleUsers = [
  '5dd02c42-3024-4c57-bf3a-e1cdd239502c',
  '5eb24c36-6192-4108-bdff-cf7c1d376526',
];

const createMatch = async (users, user, whiskId) => {
  //group users by preference

  let femaleUsers = [];
  let maleUsers = [];
  console.log('users', users);
  users.filter((u) => {
    if (u.preference === 'females') {
      femaleUsers.push(u);
    } else {
      maleUsers.push(u);
    }
  });

  //Assemble possible matches for current user
  let possibleMatches = [];
  switch (user.preference) {
    case 'females':
      possibleMatches = femaleUsers;
      break;
    case 'males':
      possibleMatches = maleUsers;
      break;
    case 'other':
      possibleMatches = femaleUsers;
      possibleMatches.push(...maleUsers);
      break;
    default:
      possibleMatches = femaleUsers;
      possibleMatches.push(...maleUsers);
      break;
  }

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
    const apiName = 'WhiskPro';
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

    const apiName = 'WhiskPro';
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
};

export default createMatch;
