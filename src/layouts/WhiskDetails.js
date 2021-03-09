import React, { useEffect, useState } from 'react';
import { Avatar, IconButton, Container, Button } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import Carousel from 'react-material-ui-carousel';
//import { useParams } from 'react-router-dom';

const WhiskDetails = () => {
  //const { id } = useParams();
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  useEffect(() => {
    //Use id for GET request
  }, []);

  //dummy data:
  const whisk = {
    title: 'Beaches & Islands Paddleboard Tour',
    images: [
      'https://a0.muscache.com/im/pictures/2b94dbb2-4648-4e3c-9b6f-c0a2e3a7e381.jpg?im_w=1440',
      'https://a0.muscache.com/im/pictures/c34926e9-fb13-4ad0-880d-f6736021ba98.jpg?im_w=1440',
      'https://a0.muscache.com/im/pictures/fede252b-1b7d-4df4-a615-10d3192ddc5c.jpg?im_w=1440',
    ],
    city: 'Vancouver',
    neighborhood: 'UBC',
    description:
      'Your adventure will begin at a local beach.  You will be whisked away to private beaches with an experienced instructor. Paddleboard and wetsuit rental included.',
    durationHours: 3,
    participants: 2,
    type: 'outdoors',
    tags: ['Summer', 'Activity', 'Water'],
    cost: '$$$',
  };

  return (
    <Container className='whisk-details'>
      <div className='top-nav'>
        <IconButton aria-label='back'>
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton aria-label='like' onClick={handleLike}>
          {liked ? <FavoriteIcon className='icon' /> : <FavoriteBorderIcon />}
        </IconButton>
      </div>
      <div className='image-gallery'>
        <Carousel
          autoPlay={true}
          navButtonsAlwaysInvisible={true}
          activeIndicatorIconButtonProps={{
            style: {
              color: '#00d1ff',
            },
          }}
          animation='slide'
        >
          {whisk.images.map((img) => (
            <Avatar
              src={img}
              alt={whisk.title}
              className='avatar-img'
              key={img}
            />
          ))}
        </Carousel>
      </div>
      <div className='info'>
        <h2 className='whisk-title'>{whisk.title}</h2>
        <div>
          <h4>Whisk Details</h4>
          <div>{whisk.description}</div>
        </div>
        <div className='details'>
          <div>
            <h4>Cost</h4>
            {whisk.cost}
          </div>
          <div>
            <h4>Duration</h4>
            {whisk.durationHours} hours
          </div>
          <div>
            <h4>Participants</h4>
            {Array(whisk.participants).fill(<EmojiPeopleIcon />)}
          </div>
        </div>
      </div>
      <div className='button'>
        <Button className='choose-whisk'>Choose Whisk</Button>
      </div>
    </Container>
  );
};

export default WhiskDetails;
