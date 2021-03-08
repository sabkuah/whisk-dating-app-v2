import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CardVertical from '../CardVertical';

export default function SuggestedWhisks() {
  const classes = useStyles();

  const filteredWhisks = [
    {
      id: 100,
      title: 'Coffee Date in Mt. Pleasant',
      images: [
        'https://res.cloudinary.com/fittco/image/upload/v1557509574/cshp6bekdicl5v7wqlgq.jpg',
      ],
      description:
        'Enjoy a brief stroll through the Mt.Pleasant neighbourhood while sipping on coffee from local roasters',
      durationHours: 2,
      participants: 2,
    },
    {
      id: 101,
      title: 'Coffee Date in Mt. Pleasant',
      images: [
        'https://res.cloudinary.com/fittco/image/upload/v1557509574/cshp6bekdicl5v7wqlgq.jpg',
      ],
      description:
        'Enjoy a brief stroll through the Mt.Pleasant neighbourhood while sipping on coffee from local roasters',
      durationHours: 2,
      participants: 2,
    },
    {
      id: 102,
      title: 'Coffee Date in Mt. Pleasant',
      images: [
        'https://res.cloudinary.com/fittco/image/upload/v1557509574/cshp6bekdicl5v7wqlgq.jpg',
      ],
      description:
        'Enjoy a brief stroll through the Mt.Pleasant neighbourhood while sipping on coffee from local roasters',
      durationHours: 2,
      participants: 2,
    },
  ];

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {filteredWhisks.map((whisk) => (
          <div key={whisk.id} className={classes.gridTile}>
            <CardVertical whisk={whisk} />
          </div>
        ))}
      </GridList>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: '#00d1ff',
    height: '20em',
    alignItems: 'center',
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    backgroundColor: '#f2f2f2',
    height: '17em',
  },
  //   gridTile: {
  //     height: '300px',
  //   },
}));
