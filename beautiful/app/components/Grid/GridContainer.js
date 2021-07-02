import React from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';

const styles = {
  grid: {
    margin: '0 -15px !important',
    width: 'unset',
  },
  flexWrapReverse: {
    flexWrap: 'wrap-reverse',
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
};

const useStyles = makeStyles(styles);

export default function GridContainer(props) {
  const classes = useStyles();
  const { children, ...rest } = props;
  return (
    <Grid
      container
      {...rest}
      className={classNames(
        classes.grid,
        {
          [classes.flexWrapReverse]: props.reverse === 'true',
        },
        {
          [classes.flexWrap]: props.reverse === 'false',
        },
      )}
    >
      {children}
    </Grid>
  );
}

GridContainer.propTypes = {
  children: PropTypes.node,
  reverse: PropTypes.string,
};
