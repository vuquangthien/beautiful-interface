/* eslint-disable prettier/prettier */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const styles = {
  root: {
    backgroundColor: '#e0e0e0',
    height: '0.01em',
  },
};

const useStyles = makeStyles(styles);

export default function() {
  const classes = useStyles();

  return <Divider className={classes.root} />;
}
