import React from 'react';
import { Card, CardContent, Avatar, Typography } from '@material-ui/core';

const CardVertical = () => {
  return (
    <div className='card-vertical'>
      <Card className='card'>
        <Avatar
          className='avatar'
          alt=''
          src='https://res.cloudinary.com/fittco/image/upload/v1557509574/cshp6bekdicl5v7wqlgq.jpg'
        />
        <CardContent className='card-content'>
          <Typography className='card-text'>
            Coffee Date in Mt. Pleasant
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardVertical;
