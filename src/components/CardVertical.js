import React from 'react';
import { Card, CardContent, Avatar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const CardVertical = ({ whisk }) => {
  return (
    <Link to={`/whisks/id`}>
      <div className='card-vertical'>
        <Card className='card'>
          <Avatar className='avatar' alt={whisk.title} src={whisk.images[0]} />
          <CardContent className='card-content'>
            <Typography className='card-text'>{whisk.title}</Typography>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
};

export default CardVertical;
