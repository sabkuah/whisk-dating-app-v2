import React, { useEffect } from 'react';
import CardHorizontal from '../CardHorizontal';
import Spinner from '../Spinner';

const ChosenWhisks = ({ whisks }) => {
  useEffect(() => {
    console.log('whisks in chosenWhisks', whisks);
  }, []);

  if (!whisks) return <Spinner />;
  else
    return (
      <div className='chosen-whisks'>
        <h1>Your Chosen Whisks</h1>
        {whisks.length ? (
          <div>
            {whisks.map((w) => {
              return <CardHorizontal whisk={w} key={w.ID} />;
            })}
          </div>
        ) : (
          <h1>No Chosen Whisks. Go out and get some! </h1>
        )}
      </div>
    );
};

export default ChosenWhisks;
