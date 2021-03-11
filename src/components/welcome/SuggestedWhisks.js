import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  GridList,
  Tab,
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
} from '@material-ui/core';
import CardVertical from '../CardVertical';
import filteredWhisks from './dummyData';
import { BrowserView, MobileView } from 'react-device-detect';
import { Link } from 'react-router-dom';
import WhiskTabs from '../WhiskTabs';

export default function SuggestedWhisks() {
  const classes = useStyles();
  const [value, setValue] = useState('food');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log('value', value);
    //add filtering logic
  }, [value]);

  return (
    <>
      <div className='suggested-whisks'>
        <WhiskTabs
          value={value}
          onChange={handleChange}
          variant='fullWidth'
          aria-label='whisk categories'
          className='tabs'
        >
          <Tab label='Food' value='food' />
          <Tab label='Outdoors' value='outdoor' />
          <Tab label='Adventure' value='adventure' />
        </WhiskTabs>

        {/* If viewing from Mobile/small screen, display horizontal scrolling, one row only */}

        <div className='horiz-scroll'>
          <GridList className={classes.gridList} id='horiz-grid'>
            {filteredWhisks.map((whisk) => (
              <div key={whisk.id}>
                <CardVertical whisk={whisk} />
              </div>
            ))}
          </GridList>
        </div>

        {/* If in larger screen/browser, display multiple rows, no horizontal scrolling */}

        <div className='vertical-scroll'>
          <Grid container justify='flex-start' spacing={2}>
            {filteredWhisks.map((whisk, i) => (
              <Grid
                item
                sm={4}
                md={3}
                key={whisk.id}
                className='v-card-vertical'
              >
                <Link to={`/whisks/${whisk.id}`}>
                  <Avatar
                    className='v-avatar'
                    alt={whisk.title}
                    src={whisk.images[0]}
                  />
                  <Card className='v-card'>
                    <CardContent className='card-content'>
                      <Typography className='card-text'>
                        {whisk.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
}

//GridList styles not working in SASS
const useStyles = makeStyles((theme) => ({
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    backgroundColor: '#f2f2f2',
    height: '18em',
  },
}));
