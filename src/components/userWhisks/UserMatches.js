import React from 'react';

const UserMatches = ({ whisks }) => {
  return (
    <div className='user-matches'>
      <h1>Your Matches</h1>
      {whisks?.length ? (
        <p>yes there are matches</p>
      ) : (
        // <div>
        //   {whisks.map((w) => {
        //     return <CardHorizontal whisk={w} key={w.ID} />;
        //   })}
        // </div>
        <p>No matches yet, hang tight! </p>
      )}
    </div>
  );
};

export default UserMatches;
