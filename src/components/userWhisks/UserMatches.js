import React from 'react';

const UserMatches = ({ whisks }) => {
  return (
    <div className='user-matches'>
      <h1>Your Matches</h1>
      {whisks?.length ? (
        <p>yes there are matches</p>
      ) : (
        <p>No matches yet, hang tight! </p>
      )}
    </div>
  );
};

export default UserMatches;
