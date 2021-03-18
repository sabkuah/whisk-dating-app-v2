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

const createMatch = async (user, whiskId) => {
  //Assemble possible matches
  let possibleMatches = [];
  switch (user.preference) {
    case 'females':
      possibleMatches = FemaleUsers;
      break;
    case 'males':
      possibleMatches = MaleUsers;
      break;
    case 'other':
      possibleMatches = FemaleUsers;
      possibleMatches.push(...MaleUsers);
      break;
    default:
      possibleMatches = FemaleUsers;
      possibleMatches.push(...MaleUsers);
      break;
  }

  //Pick a random person
  console.log('Your possible matches are: ', possibleMatches);
  const randomIndex = Math.floor(Math.random() * possibleMatches.length);
  const matchedUserId = possibleMatches[randomIndex];
  possibleMatches = []; //reset

  console.log('Congrats, your match is: ', matchedUserId);

  //Create match object
  const newMatch = {
    ID: uuid(),
    isConfirmed: true,
    status: 'pending',
    Type: 'Match',
    userIds: [user.ID, matchedUserId],
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

  //Add matchID to both user objects --> append to user's matches array

  const postMatchToUser = async (userId, matchId) => {
    const apiName = 'WhiskPro';
    const path = `/api/Object/match`;
    const myInit = {
      body: {
        matchId: matchId,
        userId: userId,
      },
    }; //user.matches.push(matchId)

    await API.post(apiName, path, myInit);
  };

  await postMatchToUser(user.ID, newMatch.ID); //add match to user
  await postMatchToUser(matchedUserId, newMatch.ID); //add match to matchedUser
};

export default createMatch;
