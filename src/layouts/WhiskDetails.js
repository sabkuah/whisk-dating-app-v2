import React, { useState, useEffect, useContext } from 'react';
import { Avatar, IconButton, Container, Button, Grid } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
//import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import Carousel from 'react-material-ui-carousel';
import { useParams, useHistory } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import WhiskContext from '../context/whisk/whiskContext';
import UserContext from '../context/user/userContext';

const WhiskDetails = () => {
  const whiskContext = useContext(WhiskContext);
  const userContext = useContext(UserContext);
  const { whisks, getWhisk, loading, setLoadingFalse } = whiskContext;
  const { user, chooseWhisk } = userContext;
  const { id } = useParams();
  const history = useHistory();
  const [liked, setLiked] = useState(false);
  const [whisk, setWhisk] = useState();

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleChooseWhisk = async () => {
    if (user.ChosenWhisks.includes(whisk.ID)) {
      alert('You have already chosen this Whisk!'); //replace this alert
    } else {
      await chooseWhisk(user, whisk);
      history.push('/user/whisks');
    }
  };

  useEffect(() => {
    //if whisks in context
    if (whisks.length) {
      console.log('calling Context for this whisk');
      const items = whisks.filter((w) => {
        return w.ID === id;
      });
      setWhisk(items[0]);
      setLoadingFalse();
    }
    //else, get whisks from API
    else {
      console.log('calling API for this whisk');
      (async () => {
        const item = await getWhisk(id);
        setWhisk(item);
        setLoadingFalse();
      })();
    }
    // eslint-disable-next-line
  }, [id, whisks]);

  if (loading || !whisk) {
    return <Spinner />;
  } else
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
              <Button onClick={handleChooseWhisk} className='choose-whisk'>
                Choose Whisk
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    );
};
export default WhiskDetails;
