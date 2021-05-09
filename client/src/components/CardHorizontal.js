import React from 'react';
import { Card, Avatar, CardContent } from '@material-ui/core';
import { Link } from 'react-router-dom';

const CardHorizontal = ({ whisk }) => {
  return (
    <Link to={`/whisks/${whisk.ID}`}>
      <Card className='horizontal-card'>
        <Avatar src={whisk.images[0]} alt={whisk.title} className='avatar' />
        <CardContent>
          <h3>{whisk.title}</h3>
          <p>{whisk.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CardHorizontal;
