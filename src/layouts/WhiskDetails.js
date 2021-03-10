import React, { useEffect, useState } from 'react';
import { Avatar, IconButton, Container, Button, Grid } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
//import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import Carousel from 'react-material-ui-carousel';
//import { useParams } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';
import { Link } from 'react-router-dom';

const WhiskDetails = () => {
  //const { id } = useParams();
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  useEffect(() => {
    //Use id for GET request
  }, []);

  return (
    <Container className='whisk-details'>
      <div className='top-nav'>
        <IconButton aria-label='back'>
          <Link to='/'>
            <ArrowBackIosIcon />
          </Link>
        </IconButton>
        <IconButton aria-label='like' onClick={handleLike}>
          {liked ? <FavoriteIcon className='icon' /> : <FavoriteBorderIcon />}
        </IconButton>
      </div>
      <Grid container spacing={5} direction='row'>
        <Grid item xs={12} md={6} className='image-gallery'>
          <MobileView>
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
              {whisk.images.map((img, i) => (
                <Avatar
                  key={i}
                  src={img}
                  alt={whisk.title}
                  className='avatar-img'
                />
              ))}
            </Carousel>
          </MobileView>
          <BrowserView>
            <Carousel
              autoPlay={true}
              navButtonsAlwaysVisible={true}
              activeIndicatorIconButtonProps={{
                style: {
                  color: '#00d1ff',
                },
              }}
              animation='slide'
            >
              {whisk.images.map((img, i) => (
                <div key={i} className='browser-carousel-div'>
                  <img
                    src={img}
                    alt={whisk.title}
                    className='browser-carousel-img'
                  />
                </div>
              ))}
            </Carousel>
          </BrowserView>
        </Grid>
        <Grid item xs={12} md={6} className='info'>
          <h2 className='whisk-title'>{whisk.title}</h2>
          <div>
            <h4>Whisk Details</h4>
            <div>{whisk.description}</div>
            <br />
          </div>
          <Grid
            container
            direction='row'
            justify='space-around'
            alignItems='center'
            className='details'
          >
            <Grid item xs className='detail'>
              <h4>Cost</h4>
              {whisk.cost}
            </Grid>
            <Grid item xs className='detail'>
              <h4>Duration</h4>
              {whisk.durationHours} hours
            </Grid>
            <Grid item xs className='detail'>
              <h4>Participants</h4>
              {whisk.participants}
              {/* {Array(whisk.participants).fill()} */}
            </Grid>
          </Grid>
          <div className='button'>
            <Button className='choose-whisk'>Choose Whisk</Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

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

export default WhiskDetails;
